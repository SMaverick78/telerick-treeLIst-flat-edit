import React from 'react';
import Input from '@material-ui/core/Input';

const EditCell = props => {
  const { dataItem, field, onChange, colspan } = props;

  return (
    <td colSpan={colspan}>
      <Input
        value={dataItem[field] || ''}
        onChange={event => {
          return onChange({
            ...props,
            dataItem: dataItem,
            field: field,
            value: event.target.value
          });
        }}
      />
    </td>
  );
};

export default EditCell;
