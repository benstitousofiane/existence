Language set used in the Output.tsx on "components/edit/Output.tsx"
Note: for null value use NULL
exmample for juste set a border radius: B NULL NULL 12
---
RC : Root colors [ backgroud-color (soon...) buttons-background-color buttons-foreground-colors ]

example :
RC #511f33 #e0ff8a #511f33
---
B : new Box [ background-color text-color border-radius (soon...) text-font ]

Box pins & badges -> PR (Push Relative)

example:
B

E: End of box
example:
B
.
.
.
E
---
T : Text, text with a default font [ text-content ]
example : T We have
---
TL : Text LaTeX, text with the latex default font made by \text command
example : TL Theorem 1
---
M : Math formula [ formula ], math formula only, using LaTeX command with \displaystyle, no any TikZ command avaible with that.
example : M (x+y)^n = \sum_{k = 0}^n \binom{n}{k}x^{n-k}y^{k}

PN : Push normal
example :
B
.
.
.
PN

E
---
PC : Push Center
B
.
.
.
PC

E
---
I : Image [ src image-url width height border-radius ]

AB : Absolute Box [ background-color text-color shift-top shift-left padding ] , made basic for make badges & pins for boxes