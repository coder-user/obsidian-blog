---
tags:
  - 工具
---

# AutoKey 快捷键脚本笔记

## 1 代码概览

以下是您提供的 AutoKey 脚本代码，用于自定义键盘快捷键行为：

```c
SetCapsLockState "AlwaysOff"  ; 将CapsLock键永久设为关闭状态

CapsLock::ESC  ; 将CapsLock键映射为ESC键

; 当按下CapsLock和`键时，切换CapsLock状态
CapsLock & `::  
{
  SetCapsLockState !GetKeyState("CapsLock", "T")
}

; 将CapsLock+h/j/k/l映射为方向键
CapsLock & h::Left  
CapsLock & j::Down  
CapsLock & k::Up    
CapsLock & l::Right 

; CapsLock+方向键移动鼠标
CapsLock & Up::MouseMove(0, -20, 0, "R")    
CapsLock & Down::MouseMove(0, 20, 0, "R")   
CapsLock & Left::MouseMove(-20, 0, 0, "R")  
CapsLock & Right::MouseMove(20, 0, 0, "R")  

; CapsLock+Enter执行鼠标点击操作
CapsLock & Enter::  
{
  SendEvent("{Blind}{LButton down}")
  KeyWait("Enter")
  SendEvent("{Blind}{LButton up}")
  return
}

; CapsLock+`;/'映射为退格键和Ctrl+退格键
CapsLock & `;::Backspace  
CapsLock & '::^Backspace  

; CapsLock+m/q/|用于窗口控制
CapsLock & m::WinMinimize "A"
CapsLock & q::WinClose "A"
CapsLock & |::
{
  if WinGetMinMax("A")
       WinRestore "A"
    else
       WinMaximize "A"
    return
}

; 当PotPlayer64激活时的热键配置
#HotIf WinActive("ahk_class PotPlayer64")
s::Send "z"
a::Send "z"
d::Send "xxxxx"
f::Send "ccccc"
x::Send "xx"
c::Send "cc"

; 动态快捷键加载
keyToName := Map()
nameToPath := Map()

Loop read, "soft.config"
{
    Line := StrSplit(A_LoopReadLine, ",")
    HotkeyCombination := "CapsLock & " . Line[1]
    keyToName[HotkeyCombination] := line[2]
    nameToPath[line[2]] := line[3]
    Hotkey HotkeyCombination, HotkeyMyFunc
}

HotkeyMyFunc(ThisHotkey)
{
    name := keyToName.Get(ThisHotkey)
    path := nameToPath.Get(name)
    nameCombination := "ahk_exe " . name
    if WinExist(nameCombination)
        WinActivate
    else
        Run path
}
```

## 2 `soft.config` 配置文件

此配置文件定义了一系列快捷键用于快速启动应用程序：

```plaintext
p,PotPlayerMini64.exe,D:\PotPlayer\PotPlayerMini64.exe
o,Obsidian.exe,C:\Users\14137\AppData\Local\Obsidian\Obsidian.exe
...
```

## 3 快捷键功能说明

以下是您的快捷键功能说明，包括基础设置、键盘映射、鼠标控制、文本编辑、窗口控制以及动态快捷键加载：

| 功能类别       | 快捷键               | 描述                                        |
|:-------------- | -------------------- | ------------------------------------------- |
| 基础设置       | `CapsLock`           | 永久关闭 CapsLock 键                        |
| 键盘映射       | `CapsLock`           | 映射为 ESC 键                               |
|                | `CapsLock` + `` ` `` | 切换 CapsLock 状态                          |
| 方向键映射     | `CapsLock` + `h`     | 映射为左箭头                                |
|                | `CapsLock` + `j`     | 映射为下箭头                                |
|                | `CapsLock` + `k`     | 映射为上箭头                                |
|                | `CapsLock` + `l`     | 映射为右箭头                                |
| 鼠标控制       | `CapsLock` + `上`    | 鼠标向上移动                                |
|                | `CapsLock` + `下`    | 鼠标向下移动                                |
|                | `CapsLock` + `左`    | 鼠标向左移动                                |
|                | `CapsLock` + `右`    | 鼠标向右移动                                |
|                | `CapsLock` + `Enter` | 执行鼠标点击操作                            |
| 文本编辑       | `CapsLock` + `;`     | 映射为退格键                                |
|                | `CapsLock` + `'`     | 映射为 Ctrl + 退格键                        |
| 窗口控制       | `CapsLock` + `m`     | 最小化当前窗口                              |
|                | `CapsLock` + `q`     | 关闭当前窗口                                |
|                | `CapsLock` + `|`     | 切换窗口最大化/恢复状态                     |
| 动态快捷键加载 | `CapsLock` + 自定义  | 根据 `soft.config` 配置的快捷键启动应用程序 |
