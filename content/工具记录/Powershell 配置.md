---
tags:
  - 工具
---

# Powershell 配置

根据你提供的 PowerShell 配置，以下是需要提前安装的组件及其对应的安装命令。我将这些内容分类整理，以便于理解和操作。

## 1 配置准备

```powershell
# 安装 oh-my-posh
Install-Module -Name oh-my-posh -Scope CurrentUser -Force

# 安装 posh-git
Install-Module -Name posh-git -Scope CurrentUser -Force

# 安装 Starship
winget install starship
# 或者使用其他方式安装（如 Scoop）

# 安装 Terminal-Icons
Install-Module -Name Terminal-Icons -Repository PSGallery -Force

# 安装 PSReadLine
# 注意：如果 PSReadLine 已经安装且版本较新，可以跳过这一步
Install-Module -Name PSReadLine -AllowPrerelease -Scope CurrentUser -Force -SkipPublisherCheck

# 安装 PSFzf
Install-Module -Name PSFzf -Scope CurrentUser -Force

# 安装 z 模块
Install-Module -Name z -Force

# 安装 Scoop（如果还未安装）
iwr -useb get.scoop.sh | iex

# 使用 Scoop 安装相关工具
scoop install ntop duf make ripgrep fd fzf starship winfetch
```

## 2 配置文件

### 2.1 powershell

```bash
# 设置 PowerShell 使用 UTF-8 编码
[console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding

# 设置代理
$env:http_proxy = "http://127.0.0.1:7890"
$env:https_proxy = "http://127.0.0.1:7890"

# oh-my-posh + posh-git 配置
# Import-Module posh-git
# oh-my-posh 初始化，配置主题
# oh-my-posh init pwsh --config 'C:\Users\14138\AppData\Local\Programs\oh-my-posh\themes\blue-owl.omp.json' | Invoke-Expression

# 设置别名
Set-Alias open explorer.exe
Set-Alias ls Get-ChildItem
Set-Alias ll Get-ChildItem
Set-Alias rm Remove-Item
Set-Alias mv Move-Item
Set-Alias vim nvim
Set-Alias lvim 'C:\Users\14138\.local\bin\lvim.ps1'

# starship 提示符配置
# Invoke-Expression (&starship init powershell)
Invoke-Expression (& 'C:\Program Files\starship\bin\starship' init powershell)

# Terminal-Icons 模块导入
# Install-Module -Name Terminal-Icons -Repository PSGallery -Force
Import-Module -Name Terminal-Icons

# PSReadLine 配置
# Install-Module -Name PowerShellGet -Force
# Install-Module PSReadLine
# Install-Module -Name PSReadLine -AllowPrerelease -Scope CurrentUser -Force -SkipPublisherCheck

Import-Module -Name PSReadLine
Set-PSReadlineKeyHandler -Key Tab -Function Complete
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
Set-PSReadLineOption -BellStyle None
Set-PSReadLineOption -HistorySearchCursorMovesToEnd
Set-PSReadLineOption -MaximumHistoryCount 8192
Set-PSReadLineKeyHandler -Key 'Ctrl+j' -Function HistorySearchForward
Set-PSReadLineKeyHandler -Key 'Ctrl+k' -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo
Set-PSReadLineKeyHandler -Key "Ctrl+d" -Function MenuComplete
Set-PSReadLineOption -MaximumHistoryCount 8192

# PSFzf 模块配置
# Install-Module -Name PSFzf -RequiredVersion 2.5.16
Import-Module PSFzf
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+t' -PSReadlineChordReverseHistory 'Ctrl+r'

# z 模块导入
# Install-Module -Name z -Force
Import-Module -Name z

# 实用工具函数
function which ($command) {
  Get-Command -Name $command -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty Path -ErrorAction SilentlyContinue
}

# scoop 工具安装配置
# scoop install ntop duf make ripgrep fd fzf starship
# scoop install winfetch

# winfetch 配置
function grep {
    rg -i -n --max-count=1000 --max-depth=3 $args
}

function Get-IPv4Routes {
	Get-NetRoute -AddressFamily IPv4 | Where-Object -FilterScript {$_. NextHop -ne '0.0.0.0'}
}
Set-Alias -Name getip -Value Get-IPv4Routes
```

### 2.2 starship

- **Windows**: `C:\Users\<YourUsername>\starship.toml`

```bash
# [golang]
# format = 'via [🏎💨 $version](bold cyan) '
#
# [lua]
# format = 'via [🌕 $version](bold blue) '


format = """
[ ](bold white)$hostname$kubernetes$directory$git_branch$git_commit$git_state$git_status$docker_context$package$golang$helm$java$cmake$julia$kotlin$lua$nim$nodejs$python$ruby$rust$swift$terraform$aws$gcloud$azure $battery               
[ ❯ ](bold green)"""

[aws]
symbol = "  "

[buf]
symbol = " "

[c]
symbol = " "

[conda]
symbol = " "

[dart]
symbol = " "

[directory]
read_only = " "
truncation_length = 7
truncation_symbol = "…/"

[hostname]
ssh_only = false
format = '[$hostname]($style) '
style = "blue bold"
trim_at = "."
disabled = false

[username]
style_user = "blue bold"
style_root = "red bold"
format = "[$user]($style) "
disabled = false
show_always = true

[docker_context]
symbol = " "

[elixir]
symbol = " "

[elm]
symbol = " "

[git_branch]
symbol = " "

[git_status]
ahead = "⇡🏎💨${count}"
diverged = "⇕⇡😵${ahead_count}⇣${behind_count}"
behind = "⇣😰${count}"
conflicted = "🏳 "
untracked = "🤷"
stashed = "📦"
modified = "📝"
staged = '[++$count](green)'
renamed = "👅"
deleted ="🗑 "

[golang]
symbol = " "

[haskell]
symbol = " "

[hg_branch]
symbol = " "

[java]
symbol = " "

[julia]
symbol = " "

[lua]
symbol = " "

[memory_usage]
symbol = " "

[meson]
symbol = "喝 "

[nim]
symbol = " "

[nix_shell]
symbol = " "

[nodejs]
symbol = " "

[package]
symbol = " "

[python]
symbol = " "

[rlang]
symbol = "ﳒ "

[ruby]
symbol = " "

[rust]
symbol = " "

[scala]
symbol = " "

[spack]
symbol = "🅢 "

[battery]
full_symbol = "🔋"
charging_symbol = "🔌 "
discharging_symbol = "⚡️"

[[battery.display]]  # "bold red" style when capacity is between 0% and 10%
threshold = 10
style = "bold red"

[[battery.display]]  # "bold yellow" style when capacity is between 10% and 30%
threshold = 30
style = "bold yellow"

[[battery.display]]
threshold = 100
style = "bold green"

```