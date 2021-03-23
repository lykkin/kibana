/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

export const ERROR_ALL_AGENTS = i18n.translate('xpack.osquery.agents.errorSearchDescription', {
  defaultMessage: `An error has occurred on all agents search`,
});

export const FAIL_ALL_AGENTS = i18n.translate('xpack.osquery.agents.failSearchDescription', {
  defaultMessage: `Failed to fetch agents`,
});

export const ERROR_AGENT_GROUPS = i18n.translate('xpack.osquery.agentGroups.errorSearchDescription', {
  defaultMessage: `An error has occurred while fetching agent groups.`,
});

export const FAIL_AGENT_GROUPS = i18n.translate('xpack.osquery.agentGroups.failSearchDescription', {
  defaultMessage: `Failed to fetch agent groups.`,
});
