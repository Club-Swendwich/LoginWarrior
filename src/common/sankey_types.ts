import { MouseEvent, FunctionComponent } from 'react'
import { SankeyNodeMinimal } from 'd3-sankey'

// ----------------------------------------------------------------------------------
// L'idea è di creare i nodi seguendo una struttura:
// insieme dei dati     ->  7 giorni della settimana  ->  12 orari (gruppi di 2 ore)
// ----------------------------------------------------------------------------------



// Definizione  base di un nodo
export interface SankeyNode {
    id: string
}

// Definizione base del collegamento tra nodi
export interface SankeyLink {
    source: string  // nodo di partenza
    target: string  // nodo di arrivo
    value: number   // ampiezza collegamento
    color: string   // colore del collegamento
}


export type SankeyLinkDatum<N extends SankeyNode, L extends SankeyLink> = {
    value: number
    index: number
    source: SankeyNodeDatum<N, L>
    target: SankeyNodeDatum<N, L>
    color: string
}

// Bisogna ragionare sulle coordinate del nodo 
export type SankeyNodeDatum<N extends SankeyNode, L extends SankeyLink> = N & {
    x0: number      // coordinate assolute del nodo
    x1: number
    y0: number
    y1: number
    color: string
    label: string
    sourceLinks: SankeyLinkDatum<N, L>[]
    targetLinks: SankeyLinkDatum<N, L>[]
    //questi dati sono usati per definire dimensioni e coordinate del nodo in base alla formattazione della pagina
    x: number
    y: number
    width: number
    height: number
}



export interface SankeyDataProps<N extends SankeyNode, L extends SankeyLink> {
    data: {
        nodes: N[]
        links: L[]
    }
}


export type SankeyMouseHandler = <N extends SankeyNode, L extends SankeyLink>(
    data: SankeyNodeDatum<N, L> | SankeyLinkDatum<N, L>,
    event: MouseEvent
) => void


export type SankeyLayerId = 'links' | 'nodes' | 'labels' | 'legends'


export interface SankeyCommonProps<N extends SankeyNode, L extends SankeyLink> {
    layers: SankeyLayerId[]

    nodeOpacity: number
    nodeHoverOpacity: number
    nodeHoverOthersOpacity: number
    nodeThickness: number
    nodeSpacing: number
    nodeInnerPadding: number
    nodeBorderWidth: number
    nodeBorderRadius: number

    linkOpacity: number
    linkHoverOpacity: number
    linkHoverOthersOpacity: number
    linkContract: number

    enableLabels: boolean
    labelPosition: 'inside' | 'outside'
    labelPadding: number
    labelOrientation: 'horizontal' | 'vertical'

    onClick: SankeyMouseHandler
    nodeTooltip: FunctionComponent<{ node: SankeyNodeDatum<N, L> }>
    linkTooltip: FunctionComponent<{ link: SankeyLinkDatum<N, L> }>

    renderWrapper: boolean
}

export type SankeySvgProps<N extends SankeyNode, L extends SankeyLink> = Partial<
    SankeyCommonProps<N, L>
> &
    SankeyDataProps<N, L> 