/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useCallback } from 'react';
import { EuiCodeEditor } from '@elastic/eui';
import 'brace/theme/tomorrow';
import 'brace/ext/language_tools';

import './osquery_mode';

const EDITOR_SET_OPTIONS = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
};

const EDITOR_PROPS = {
  $blockScrolling: true,
};

interface OsqueryEditorProps {
  defaultValue: string;
  onChange: (newValue: string) => void;
}

const OsqueryEditorComponent: React.FC<OsqueryEditorProps> = ({ defaultValue, onChange }) => {
  const handleChange = useCallback(
    (newValue) => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <EuiCodeEditor
      value={defaultValue}
      mode="osquery"
      theme="tomorrow"
      onChange={handleChange}
      name="osquery_editor"
      setOptions={EDITOR_SET_OPTIONS}
      editorProps={EDITOR_PROPS}
      height="100px"
      width="100%"
    />
  );
};

export const OsqueryEditor = React.memo(OsqueryEditorComponent);
