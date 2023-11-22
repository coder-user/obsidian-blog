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

## 3 VIM 配置文件

```powershell
""" Map leader to space ---------------------
let mapleader=" "

""" Common settings -------------------------
set showmode
set scrolloff=3
set relativenumber
set number
set hlsearch
set incsearch
set ignorecase
set smartcase
set notimeout
exec "nohlsearch"

""" Mappings --------------------------------

""" move
map H 5k
map L 5j
map W 5w
map B 5b

""" insert mode
" imap jj <ESC>
" imap jk <ESC>

" " Indent keeping selection
vmap < <gv
vmap > >gv

""" search
" nmap = nzz
" nmap - Nzz
nmap n nzz
nmap N Nzz
nmap <leader><CR> :nohlsearch<CR>

""" other
map Y \"+y


" table
nmap ]b <action>(NextTab)
nmap [b <action>(PreviousTab)
nmap ]e <action>(GotoNextError)
nmap [e <action>(GotoPreviousError)
nmap ]m <action>(MethodDown)
nmap [m <action>(MethodUp)

" file/find
let g:WhichKeyDesc_FileOrFind = "<leader>f +file/find"
let g:WhichKeyDesc_FileOrFind_GotoFile = "<leader>ff Goto File"
let g:WhichKeyDesc_FileOrFind_SelectInProjectView = "<leader>fe Select in Project View"
let g:WhichKeyDesc_FileOrFind_FindInPath = "<leader>ft Find in Path"
let g:WhichKeyDesc_FileOrFind_RecentFiles = "<leader>fr Recent Files"
let g:WhichKeyDesc_FileOrFind_GotoAction = "<leader>fa Goto Action"
let g:WhichKeyDesc_FileOrFind_RecentChangedFiles = "<leader>fc Recent Changed Files"
let g:WhichKeyDesc_FileOrFind_FindInPath = "<leader>fw Find in Path"
let g:WhichKeyDesc_FileOrFind_OpenProjectWindows = "<leader>fp Open Project Windows"
nmap <leader>ff <action>(GotoFile)
nmap <leader>fe <action>(SelectInProjectView)
nmap <leader>ft <action>(FindInPath)
nmap <leader>fr <action>(RecentFiles)
nmap <leader>fa <action>(GotoAction)
nmap <leader>fc <action>(RecentChangedFiles)
nmap <leader>fw <action>(FindInPath)
nmap <leader>fp <action>(OpenProjectWindows)

nmap <leader>e <action>(SelectInProjectView)

" map  = nmap vmap
" nmap
" vmap
" imap

let g:WhichKeyDesc_Code = "<leader>c +code"
let g:WhichKeyDesc_Code_RenameElement = "<leader>cr Rename Element"
let g:WhichKeyDesc_Code_FileStructurePopup = "<leader>cs File Structure Popup"
let g:WhichKeyDesc_Code_ReformatCode = "<leader>cf Reformat Code"
let g:WhichKeyDesc_Code_CompareClipboardWithSelection = "<leader>cp Compare Clipboard"
let g:WhichKeyDesc_Code_EditorTranslateAction = "<leader>ct Translate"
nmap <leader>cr <action>(RenameElement)
nmap <leader>cs <action>(FileStructurePopup)
nmap <leader>cf <action>(ReformatCode)
map <leader>cp <action>(CompareClipboardWithSelection)
map <leader>ct <action>($EditorTranslateAction)


" nmap <leader>\| <action>(SplitVertically)
" nmap <leader>\ <action>(SplitHorizontally)
let g:WhichKeyDesc_Windows = "<leader>w +windows"
let g:WhichKeyDesc_Windows_SplitVertically = "<leader>w| Split Vertically"
let g:WhichKeyDesc_Windows_SplitHorizontally = "<leader>w- Split Horizontally"
let g:WhichKeyDesc_Windows_Unsplit = "<leader>wd Unsplit"
let g:WhichKeyDesc_Windows_HideAllWindows = "<leader>wh Hide All Windows"
let g:WhichKeyDesc_Windows_PrevSplitter = "<leader>wp Previous Splitter"
let g:WhichKeyDesc_Windows_NextSplitter = "<leader>wn Next Splitter"
let g:WhichKeyDesc_Windows_ToggleFullScreen = "<leader>wf Toggle Full Screen"
let g:WhichKeyDesc_Windows_EditSourceInNewWindow = "<leader>we Edit Source in New Window"
nmap <leader>w\| <action>(SplitVertically)
nmap <leader>w- <action>(SplitHorizontally)
nmap <leader>wd <action>(Unsplit)
nmap <leader>wh <action>(HideAllWindows)
nmap <leader>wp <action>(PrevSplitter)
nmap <leader>wn <action>(NextSplitter)
nmap <leader>wj <action>(PrevSplitter)
nmap <leader>wk <action>(NextSplitter)
nmap <leader>wf <action>(ToggleFullScreen)
nmap <leader>we <action>(EditSourceInNewWindow)
nmap <C-h> <action>(PrevSplitter)
nmap <C-l> <action>(NextSplitter)

nmap <TAB> :action PreviousTab<CR>
nmap <S-TAB> :action NextTab<CR>

let g:WhichKeyDesc_RunOrDebug = "<leader>d +debug"
let g:WhichKeyDesc_RunOrDebug_Debug = "<leader>dd Debug"
let g:WhichKeyDesc_RunOrDebug_Rerun = "<leader>dr Rerun"
let g:WhichKeyDesc_RunOrDebug_ToggleLineBreakpoint = "<leader>db Toggle Line Breakpoint"
let g:WhichKeyDesc_RunOrDebug_Resume = "<leader>dc Resume"
let g:WhichKeyDesc_RunOrDebug_RunToCursor = "<leader>dC Run to Cursor"
nmap <leader>ds <action>(Debug)
nmap <leader>dr <action>(Rerun)
nmap <leader>db <action>(ToggleLineBreakpoint)
nmap <leader>dc <action>(Resume)
nmap <leader>dC <action>(RunToCursor)


let g:WhichKeyDesc_Show = "<leader>s +show"
let g:WhichKeyDesc_Show_ViewBreakpoints = "<leader>sd View Breakpoints"
let g:WhichKeyDesc_Show_FileStructurePopup = "<leader>ss File Structure Popup"
let g:WhichKeyDesc_Show_ShowBookmarks = "<leader>sm Show Bookmarks"
let g:WhichKeyDesc_Show_ActivateTerminalToolWindow = "<leader>st Activate Terminal Tool Window"
nmap <leader>sd <action>(ViewBreakpoints)
nmap <leader>ss <action>(FileStructurePopup)
nmap <leader>sm <action>(ShowBookmarks)
nmap <leader>st <action>(ActivateTerminalToolWindow)
nmap <leader>sr :reg<CR>

let g:WhichKeyDesc_Editors_CloseContent = "<leader>q +close"
let g:WhichKeyDesc_Editors_CloseAllEditors = "<leader>qa Close All Editors"
nmap <leader>q <action>(CloseContent)
nmap <leader>qa <action>(CloseAllEditors)

map <leader>/ <action>(FindInPath)
map <CR> <action>(EditorSelectWord)


let g:WhichKeyDesc_Git = "<leader>g +git"
let g:WhichKeyDesc_Git_ActivateCommitToolWindow = "<leader>gc Activate Commit Tool Window"
let g:WhichKeyDesc_Git_ShowInlineBlame = "<leader>gb Show Inline Blame"
nmap <leader>gc <action>(ActivateCommitToolWindow)
nmap <leader>gb <action>(GitToolBox.ShowInlineBlame)

map gc <action>(CommentByLineComment)
map gD <action>(GotoDeclaration)
map gI <action>(GotoImplementation)
map gt <action>(GotoTest)

" Project management
let g:WhichKeyDesc_Project = "<leader>p +project"
let g:WhichKeyDesc_Project_ManageRecentProjects = "<leader>pr Manage Recent Projects"
let g:WhichKeyDesc_Project_RecentProjectListGroup = "<leader>pl Recent Project List Group"
let g:WhichKeyDesc_Project_CloseProject = "<leader>px Close Project"
map <leader>pr <Action>(ManageRecentProjects)
map <leader>pl <Action>(RecentProjectListGroup)
map <leader>px <Action>(CloseProject)


" bookmark in whole program
nmap ma mA
nmap 'a 'A
nmap ms mS
nmap 's 'S
nmap md mD
nmap 'd 'D
nmap mf mF
nmap 'f 'F

let g:WhichKeyDesc_Mark = "<leader>m +mark"
let g:WhichKeyDesc_Mark_ToggleBookmark = "<leader>ma Toggle Bookmark With Mnemonic"
let g:WhichKeyDesc_Mark_ToggleBookmark_ToggleBookmark = "<leader>md Toggle Bookmark"
map <leader>ma <action>(ToggleBookmarkWithMnemonic)
map <leader>md <action>(ToggleBookmark)

"""hide
let g:WhichKeyDesc_SelectInProjectView_Hide = "<leader>e"
let g:WhichKeyDesc_Easymotion_Hide = "<leader>j"
let g:WhichKeyDesc_Easymotion2_Hide = "<leader><leader>"
let g:WhichKeyDesc_Nohlsearch_Hide = "<leader><Enter>"
let g:WhichKeyDesc_FindInPath_Hide = "<leader>/"

""" Plugins  --------------------------------
set ideajoin
set easymotion
set NERDTree
"set surround
set argtextobj
set visualbell
set highlightedyank
set sneak
set quickscope
set multiple-cursors
# set trackactionids

""" Plugin settings -------------------------
let g:argtextobj_pairs="(:),{:},<:>"
let g:highlightedyank_highlight_duration = "120"
let g:highlightedyank_highlight_color = "rgba(160, 160, 160, 155)"

map <leader>j <PLug>(easymotion-s2)
" map <leader>J <Plug>(easymotion-f)
map mc <A-n>
map mx <A-x>
map mv <A-p>

""" IdeaVimExtension
set keep-english-in-normal

""" which-key
set which-key
let g:WhichKey_DefaultDelay = 600

""" sethandler
sethandler <C-s> a:ide
sethandler <C-c> a:ide
sethandler <C-v> a:ide
sethandler <C-f> a:ide
sethandler <C-b> a:ide
sethandler <C-a> a:ide
sethandler <C-q> a:ide
sethandler <C-x> a:ide
sethandler <C-w> a:ide
sethandler <C-g> a:ide

nmap \e :source ~/.ideavimrc<CR>
nmap \r <action>(IdeaVim.ReloadVimRc.reload)
```

