---
tags:
  - 工具
---

# Goland 编译器

## 1 配置

1. 设置->编辑器->代码样式->行分隔符（新文件）-> `Unix 和 macOS(\n)`
2. 设置->编辑器->代码样式->Go-> 导入 -> 勾选
   - 将所有导入移动到一个声明中
   - 组合 stdlib 导入
   - 将所有 stdlib 导入移动到一个组中
3. 设置->编辑器->代码样式->Go-> 其他 -> 向注释前添加前导空格
4. 设置->编辑器->实时模版-> Go Struct Tags -> json -> `snakeCase(fieldName())` 改为 `camelCase(fieldName())`
5. 设置->键盘映射->Back-> `Ctrl + -` ：由于使用 `VIM` 个人的配置，不期望手指移到太远（源 Back 需要使用到方向键），快捷键是同之前使用 `VS` 快捷键一致
6. 设置->键盘映射->down-> `Ctrl + j`
7. 设置->键盘映射->up-> `Ctrl + k`
8. 设置->工具->File Watcher->goimports
9. 解决每次打开的新的项目需要重新设置： `goimports` 的问题，文件->新项目设置->新项目的设置->进行 `goimports` 的配置。
10. 主题设置：`Material Oceanic`，字体大小：13，行高：1.3，字体名称：`Menlo`
11. Vim 插件配置，所有快捷键使用 IDE 的配置
12. 视图->外观->状态栏->取消勾选
13. 视图->外观->导航栏->取消勾选
14. 主题设置：外观与行为->Material Theme UI->设置->功能->显示覆盖物（去掉勾）

## 2 插件整理

| 名称                          | 作用                                           | 类别       |
| ----------------------------- | ---------------------------------------------- | ---------- |
| .ignore                       | 用于创建和编辑 .gitignore 文件                 | Git        |
| AceJump                       | 快速跳转到代码中的任意位置                     | 代码编辑   |
| Atom Material Icons           | 在项目视图中显示文件和文件夹的漂亮图标         | 界面美化   |
| Chinese (Simplified) Language | 添加简体中文语言支持                           | 语言支持   |
| Git Commit Template           | 用于快速生成 Git 提交信息模板                  | Git        |
| Git Machete                   | 用于查看和管理 Git 分支关系                    | Git        |
| Github Copilot                | 基于机器学习的代码自动补全工具                 | 代码编辑   |
| GitToolBox                    | 提供了更好的 Git 集成和工作流程                | Git        |
| Go Linter                     | 用于检查 Go 代码中的错误和潜在问题             | 代码编辑   |
| Goctl                         | 用于生成 Go 微服务的工具                       | 代码编辑   |
| Grep Console                  | 用于在控制台中搜索和高亮文本                   | 其他实用   |
| HighlightBracketPair          | 高亮匹配的括号对                             | 代码编辑   |
| IdeaVim                       | 将 Vim 的功能添加到 GoLand 中                  | 代码编辑   |
| IdeaVim-EasyMotion            | 用于在 GoLand 中实现 Vim EasyMotion 功能       | 代码编辑   |
| IdeaVim-Quickscope            | 帮助用户快速定位 GoLand 中的范围               | 代码编辑   |
| IdeaVim-Sneak                 | 在 Vim 模式下进行快速跳转                     | 代码编辑   |
| IdeaVimMulticursor            | 在 Vim 模式下支持多光标操作                   | 代码编辑   |
| Key Promoter X                | 用于帮助用户学习 GoLand 中的快捷键             | 其他实用   |
| Material Theme UI             | 提供了漂亮的 Material Design 主题              | 界面美化   |
| Notebook                      | 用于在 GoLand 中创建和编辑笔记                 | 笔记和文档 |
| PlantUML Integration          | 用于在 GoLand 中创建和编辑 UML 图表            | 代码编辑   |
| Quick Notes                   | 用于快速创建和编辑笔记                         | 笔记和文档 |
| Ini                           | 用于编辑 INI 格式文件的插件                    | 语言支持   |
| Smart Input                   | 提供智能输入功能                             | 代码编辑   |
| Toml                          | 用于编辑 Toml 格式文件的插件                   | 语言支持   |
| Translation                   | 用于在 GoLand 中进行翻译                       | 其他实用   |
| Which-Key                     | 用于帮助用户学习 GoLand 中的快捷键             | 代码编辑   |