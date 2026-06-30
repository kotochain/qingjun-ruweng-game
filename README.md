# 请君入瓮 · 烟花为聘

基于剧本杀《请君入瓮》灵感制作的网页互动文字游戏 Demo。当前版本聚焦皇甫赤华与雍门清夜，玩法为视觉小说 AVG + 轻推理。

## 当前内容

- 第一幕可玩切片：现代楔子、穿书觉醒、清夜初遇、夜宴推理、第一幕结算
- 文字系统：打字机、历史记录 Backlog、Auto 自动播放、Skip 跳过已读
- 系统功能：设置面板、单槽存档/读档、选项二次确认、好感提示
- 美术资源：真实生成背景图、角色立绘、抠图后透明立绘

## 本地运行

不需要安装前端依赖，直接用静态服务器打开：

```bash
python3 -m http.server 8765
```

然后访问：

```text
http://localhost:8765/index.html
```

也可以直接打开 `index.html`，但推荐走本地服务器，避免浏览器本地文件策略导致资源加载差异。

## 验收检查

项目内置了轻量静态检查：

```bash
node tests/static-check.mjs
```

通过时会输出：

```text
Static check passed: 42 checks
```

## 资源说明

- `assets/`：游戏运行时使用的资源
  - 背景图：`bg_*.png`
  - 标题图：`title.png`
  - 透明立绘：`*_cut.png`
- `assets_generated/`：生图 agent 产出的原始资源与角色参考图
- `process_portraits.py`：把原始立绘抠成透明 PNG 的处理脚本
- `art_prompt_pack.md`：给生图 agent 使用的提示词包

## 主要文件

```text
index.html              页面结构
css/style.css           UI 样式
js/data.js              剧情数据与资源映射
js/engine.js            AVG 引擎逻辑
tests/static-check.mjs  静态验收脚本
```

## 快捷键

- `B` / `PageUp`：历史记录
- `A`：自动播放
- `S`：跳过已读
- `Esc`：关闭系统面板
- `Space` / `Enter`：推进文本

