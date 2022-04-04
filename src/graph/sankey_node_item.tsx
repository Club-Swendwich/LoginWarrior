import { createElement, useCallback } from 'react'
import { SankeyLink, SankeyNode, SankeyCommonProps, SankeyNodeDatum } from '../common/sankey_types'

interface SankeyNodesItemProps<N extends SankeyNode, L extends SankeyLink> {
    node: SankeyNodeDatum<N, L>
    x: number
    y: number
    width: number
    height: number
    color: string
    opacity: number
    borderWidth: SankeyCommonProps<N, L>['nodeBorderWidth']
    borderColor: string
    borderRadius: SankeyCommonProps<N, L>['nodeBorderRadius']
    setCurrent: (node: SankeyNodeDatum<N, L> | null) => void
    onClick?: SankeyCommonProps<N, L>['onClick']
    tooltip: SankeyCommonProps<N, L>['nodeTooltip']
}


// Da rivedere
export const SankeyNodesItem = <N extends SankeyNode, L extends SankeyLink>({
    node,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    borderRadius,
}: SankeyNodesItemProps<N, L>) => {

    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            rx={borderRadius}
            ry={borderRadius}
            width={animatedProps.width.to(v => Math.max(v, 0))}
            height={animatedProps.height.to(v => Math.max(v, 0))}
            fill={animatedProps.color}
            fillOpacity={animatedProps.opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            strokeOpacity={opacity}
        />
    )
}
