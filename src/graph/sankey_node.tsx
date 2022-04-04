import {
    SankeyLink,
    SankeyNode,
    SankeyCommonProps,
    SankeyLinkDatum,
    SankeyNodeDatum,
} from '../common/sankey_types'
import { SankeyNodesItem } from './sankey_node_item'

interface SankeyNodesProps<N extends SankeyNode, L extends SankeyLink> {
    nodes: SankeyNodeDatum<N, L>[]
    nodeOpacity: SankeyCommonProps<N, L>['nodeOpacity']
    nodeHoverOpacity: SankeyCommonProps<N, L>['nodeHoverOpacity']
    nodeHoverOthersOpacity: SankeyCommonProps<N, L>['nodeHoverOthersOpacity']
    borderWidth: SankeyCommonProps<N, L>['nodeBorderWidth']
    getBorderColor: (node: SankeyNodeDatum<N, L>) => string
    borderRadius: SankeyCommonProps<N, L>['nodeBorderRadius']
    setCurrentNode: (node: SankeyNodeDatum<N, L> | null) => void
    currentNode: SankeyNodeDatum<N, L> | null
    currentLink: SankeyLinkDatum<N, L> | null
    isCurrentNode: (node: SankeyNodeDatum<N, L>) => boolean
    onClick?: SankeyCommonProps<N, L>['onClick']
    tooltip: SankeyCommonProps<N, L>['nodeTooltip']
}

export const SankeyNodes = <N extends SankeyNode, L extends SankeyLink>({
    nodes,
    nodeOpacity,
    nodeHoverOpacity,
    nodeHoverOthersOpacity,
    borderWidth,
    getBorderColor,
    borderRadius,
    setCurrentNode,
    currentNode,
    currentLink,
    isCurrentNode,
    onClick,
    tooltip,
}: SankeyNodesProps<N, L>) => {
    const getOpacity = (node: SankeyNodeDatum<N, L>) => {
        if (!currentNode && !currentLink) return nodeOpacity
        if (isCurrentNode(node)) return nodeHoverOpacity
        return nodeHoverOthersOpacity
    }

    return (
        <>
            {nodes.map(node => (
                <SankeyNodesItem<N, L>
                    key={node.id}
                    node={node}
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    color={node.color}
                    opacity={getOpacity(node)}
                    borderWidth={borderWidth}
                    borderColor={getBorderColor(node)}
                    borderRadius={borderRadius}
                    setCurrent={setCurrentNode}
                    onClick={onClick}
                    tooltip={tooltip}
                />
            ))}
        </>
    )
}
