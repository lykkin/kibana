/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { euiPaletteColorBlindBehindText } from '@elastic/eui';
import {
  PaginationInputPaginated,
  FactoryQueryTypes,
  StrategyResponseType,
  Inspect,
} from '../../common/search_strategy';
import { AGENT_GROUP_KEY, SelectedGroups, Overlap, AgentOptionValue } from './types';

export type InspectResponse = Inspect & { response: string[] };

export const getNumOverlapped = ({ policy, platform }: SelectedGroups, overlap: Overlap) => {
  let sum = 0;
  Object.keys(platform).forEach((plat) => {
    const policies = overlap[plat];
    Object.keys(policy).forEach((pol) => {
      sum += policies[pol] ?? 0;
    });
  });
  return sum;
};

export const generateColorPicker = () => {
  const visColorsBehindText = euiPaletteColorBlindBehindText();
  const typeColors = new Map<AGENT_GROUP_KEY, string>();
  return (type: AGENT_GROUP_KEY) => {
    if (!typeColors.has(type)) {
      typeColors.set(type, visColorsBehindText[typeColors.size]);
    }
    return typeColors.get(type);
  };
};

export const getNumAgentsInGrouping = (selectedGroups: SelectedGroups) => {
  let sum = 0;
  Object.keys(selectedGroups).forEach((g) => {
    const group = selectedGroups[g];
    sum += Object.keys(group).reduce((acc, k) => acc + group[k], 0);
  });
  return sum;
};

export const generateAgentCheck = (selectedGroups: SelectedGroups) => {
  return ({ groups }: AgentOptionValue) => {
    return Object.keys(groups)
      .map((group) => {
        const selectedGroup = selectedGroups[group];
        const agentGroup = groups[group];
        // check if the agent platform/policy is selected
        return selectedGroup[agentGroup];
      })
      .every((a) => !a);
  };
};

export const generateTablePaginationOptions = (
  activePage: number,
  limit: number,
  isBucketSort?: boolean
): PaginationInputPaginated => {
  const cursorStart = activePage * limit;
  return {
    activePage,
    cursorStart,
    fakePossibleCount: 4 <= activePage && activePage > 0 ? limit * (activePage + 2) : limit * 5,
    querySize: isBucketSort ? limit : limit + cursorStart,
  };
};

export const getInspectResponse = <T extends FactoryQueryTypes>(
  response: StrategyResponseType<T>,
  prevResponse?: InspectResponse
): InspectResponse => ({
  dsl: response?.inspect?.dsl ?? prevResponse?.dsl ?? [],
  // @ts-expect-error update types
  response:
    response != null ? [JSON.stringify(response.rawResponse, null, 2)] : prevResponse?.response,
});
