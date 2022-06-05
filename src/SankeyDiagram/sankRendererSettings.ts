/*
Da dove vengono le personalizzazioni
SankeyLabelGroup:
-FontSize
-Width

SankeyLink
-d
-color
-strokeWidth
-title

SankeyLinkGroup
-links
-strokeOpacity

SankeyRectNode (nodo singolo)
-color

SankeyRectNodeGroup (Gruppo di Nodi)


*/

export default interface SankeySettings {
    width: number,
    height: number,
    nodewidth: number,
    opacity: number
}


