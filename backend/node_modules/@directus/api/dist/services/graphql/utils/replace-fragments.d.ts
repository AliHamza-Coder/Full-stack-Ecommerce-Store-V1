import type { FragmentDefinitionNode, SelectionNode } from 'graphql';
/**
 * Replace all fragments in a selectionset for the actual selection set as defined in the fragment
 * Effectively merges the selections with the fragments used in those selections
 */
export declare function replaceFragmentsInSelections(selections: readonly SelectionNode[] | undefined, fragments: Record<string, FragmentDefinitionNode>): readonly SelectionNode[] | null;
