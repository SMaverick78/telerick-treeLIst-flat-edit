import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from './Button';
import MenuControl from './MenuControl';

export default function (
  enterEdit,
  remove,
  save,
  cancel,
  addChild,
  editField
) {
  return function TreeListCell(props) {

    const { dataItem } = props;

    if (dataItem.rowType === 'TOTAL') {
      return <td  colSpan={props.colSpan} className={props.className} style={props.style} >
        <div style={{width: 90}}/>
        </td>
    }

    // console.log(props)

    return dataItem[editField] ? (
      <td colSpan={props.colSpan} className={props.className} style={props.style}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent :"flex-end",
          alignItems: 'center'
        }}>
          <Button tagIcon={SaveIcon} onClick={() => save(dataItem)} />
          <Button tagIcon={CancelIcon} onClick={() => cancel(dataItem)} />
        </div>
      </td>
      ) : (
        <td colSpan={props.colSpan} className={props.className} style={props.style}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent :"flex-end",
          alignItems: 'center'
        }}
        >
          <MenuControl {...props} addChild={addChild} />
          <Button tagIcon={EditIcon} onClick={() => enterEdit(dataItem)} />
          <Button tagIcon={DeleteIcon} onClick={() => remove(dataItem)} />
        </div>
      </td>
    );
  };
}
