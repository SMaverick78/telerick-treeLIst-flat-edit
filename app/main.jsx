
import React from 'react';
import ReactDOM from 'react-dom';

import {
    TreeList,
    createDataTree,
    mapTree,
    extendDataItem,
    TreeListToolbar,
    removeItems, modifySubItems,
    TreeListTextEditor, TreeListBooleanEditor
} from '@progress/kendo-react-treelist';

import EditCell from './EditCell';
import Cell from './Cell';

import MyCommandCell from './my-command-cell.jsx';
import employeesFlat from './flat-data';
const editField = 'inEdit';

const expandField = 'expanded';
const subItemsField = 'employees';
const dataTree = createDataTree(employeesFlat, i => i.id, i => i.reportsTo, subItemsField);
const columns = [
    { field: 'name', title: 'Name', expandable: true, width: 280, cell: Cell, editCell: EditCell },
    { field: 'position', title: 'Position', width: 230, cell: Cell, editCell: EditCell },
    { field: 'timeInPosition', title: 'Year(s) in Position', width: 150, cell: Cell, editCell: EditCell },
    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: 150 },
    { field: 'fullTime', title: 'Full Time', width: 150 }
];

const App = (props) => {


  const [state, setState] = React.useState({
        data: [ ...dataTree ],
        expanded: [],
        inEdit: [ ]
  })

  const addChild = (dataItem) => {
      const newRecord = createNewItem();

      setState({
          ...state,
          inEdit: [ ...state.inEdit, newRecord ],
          expanded: [ ...state.expanded, dataItem.id ],
          data: modifySubItems(
              state.data,
              subItemsField,
              item => item.id === dataItem.id,
              subItems => [ newRecord, ...subItems ]
          )
      });
    }

    const enterEdit = (dataItem) => {
        setState({
          ...state,
          inEdit: [ ...state.inEdit, extendDataItem(dataItem, subItemsField) ]
        });
    }

    const save = (dataItem) => {
        const { isNew, inEdit, ...itemToSave } = dataItem;

        setState({
            ...state,
            data: mapTree(state.data, subItemsField, item => item.id === itemToSave.id ? itemToSave : item),
            inEdit: state.inEdit.filter(i => i.id !== itemToSave.id)
        });
    }

    const cancel = (editedItem) => {
        const { inEdit, data } = state;
        if (editedItem.isNew) {
            return remove(editedItem);
        }

        setState({
            ...state,
            data: mapTree(data, subItemsField,
            item => item.id === editedItem.id ? inEdit.find(i => i.id === item.id) : item),
            inEdit: inEdit.filter(i => i.id !== editedItem.id)
        });
    }

    const remove = (dataItem) => {
        this.setState({
            data: removeItems(this.state.data, subItemsField, i => i.id === dataItem.id),
            inEdit: state.inEdit.filter(i => i.id !== dataItem.id)
        });
    }

    const CommandCell = MyCommandCell(
      enterEdit,
      remove,
      save,
      cancel,
      addChild,
      editField
    );

    const onItemChange = (event) => {
      setState({
          ...state,
          data: mapTree(
              state.data,
              subItemsField,
              item => item.id === event.dataItem.id ?
                  extendDataItem(item, subItemsField, { [event.field]: event.value }) : item
          )
      });
    }

    const createNewItem = () => {
        const timestamp = new Date().getTime();
        return { id: timestamp, isNew: true };
    }

    const onExpandChange = (e) => {
        setState({
            ...state,
            expanded: e.value ?
                state.expanded.filter(id => id !== e.dataItem.id) :
                [ ...state.expanded, e.dataItem.id ]
        });
    }


  const { data, expanded, inEdit } = state;

  const callback = item =>
        extendDataItem(item, subItemsField, {
          [expandField]: expanded.includes(item.id),
          [editField]: Boolean(inEdit.find(i => i.id === item.id))
      });


  return (
      <TreeList
          style={{ maxHeight: '510px', overflow: 'auto' }}
          data={mapTree(data, subItemsField, callback)}
          editField={editField}
          expandField={expandField}
          subItemsField={subItemsField}
          onItemChange={onItemChange}
          onExpandChange={onExpandChange}
          columns={[
            { cell: CommandCell, width: 360 },
            ...columns
          ]}
      />
  );
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);


