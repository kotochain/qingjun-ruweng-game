#!/usr/bin/env python3
"""把生图立绘的深色背景抠成透明背景。

方法：OpenCV GrabCut 初分割 + 羽化 alpha。
输出保留原图尺寸，方便当前 CSS 立绘槽位继续使用。
"""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).parent
SRC = ROOT / "assets_generated"
OUT = ROOT / "assets"

PORTRAITS = [
    "chihua.png",
    "qingye_normal.png",
    "qingye_soft.png",
    "qingye_cold.png",
    "qingye_shock.png",
]


def portrait_rect(w: int, h: int, name: str) -> tuple[int, int, int, int]:
    """给 GrabCut 的前景大致区域。宁可略大，后续会羽化。"""
    if name.startswith("chihua"):
        return int(w * 0.06), int(h * 0.04), int(w * 0.88), int(h * 0.94)
    return int(w * 0.10), int(h * 0.04), int(w * 0.80), int(h * 0.94)


def cutout(name: str) -> None:
    src_path = SRC / name
    img_bgr = cv2.imread(str(src_path), cv2.IMREAD_COLOR)
    if img_bgr is None:
        raise FileNotFoundError(src_path)

    h, w = img_bgr.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    rect = portrait_rect(w, h, name)

    cv2.grabCut(img_bgr, mask, rect, bgd, fgd, 8, cv2.GC_INIT_WITH_RECT)
    fg = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype("uint8")

    # 去掉边缘零碎背景，再做柔边。数值偏保守，避免啃掉衣摆和发丝。
    kernel = np.ones((5, 5), np.uint8)
    fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, kernel, iterations=1)
    fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, kernel, iterations=2)
    alpha = cv2.GaussianBlur(fg, (0, 0), sigmaX=3.2, sigmaY=3.2)

    rgba = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGBA)
    rgba[:, :, 3] = alpha

    out_path = OUT / name.replace(".png", "_cut.png")
    Image.fromarray(rgba).save(out_path)
    print(f"OK {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    for item in PORTRAITS:
        cutout(item)
