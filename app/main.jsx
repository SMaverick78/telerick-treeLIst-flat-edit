
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

import MyCommandCell from './my-command-cell.jsx';
import employeesFlat from './flat-data';
const editField = 'inEdit';

const expandField = 'expanded';
const subItemsField = 'employees';
const dataTree = createDataTree(employeesFlat, i => i.id, i => i.reportsTo, subItemsField);
const columns = [
    { field: 'name', title: 'Name', expandable: true, width: 280, editCell: TreeListTextEditor },
    { field: 'position', title: 'Position', width: 230, editCell: TreeListTextEditor },
    { field: 'timeInPosition', title: 'Year(s) in Position', width: 150, editCell: TreeListTextEditor },
    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: 150 },
    { field: 'fullTime', title: 'Full Time', width: 150 }
];

class App extends React.Component {
    state = {
        data: [ ...dataTree ],
        expanded: [ 1, 2, 32 ],
        inEdit: [ ]
    };

    addChild = (dataItem) => {
      const newRecord = this.createNewItem();

      this.setState({
          inEdit: [ ...this.state.inEdit, newRecord ],
          expanded: [ ...this.state.expanded, dataItem.id ],
          data: modifySubItems(
              this.state.data,
              subItemsField,
              item => item.id === dataItem.id,
              subItems => [ newRecord, ...subItems ]
          )
      });
    }

    enterEdit = (dataItem) => {
        this.setState({
            inEdit: [ ...this.state.inEdit, extendDataItem(dataItem, subItemsField) ]
        });
    }

    save = (dataItem) => {
        const { isNew, inEdit, ...itemToSave } = dataItem;
        this.setState({
            data: mapTree(this.state.data, subItemsField, item => item.id === itemToSave.id ? itemToSave : item),
            inEdit: this.state.inEdit.filter(i => i.id !== itemToSave.id)
        });
    }

    cancel = (editedItem) => {
        const { inEdit, data } = this.state;
        if (editedItem.isNew) {
            return this.remove(editedItem);
        }

        this.setState({
            data: mapTree(data, subItemsField,
                item => item.id === editedItem.id ? inEdit.find(i => i.id === item.id) : item),
            inEdit: inEdit.filter(i => i.id !== editedItem.id)
        });
    }

    remove = (dataItem) => {
        this.setState({
            data: removeItems(this.state.data, subItemsField, i => i.id === dataItem.id),
            inEdit: this.state.inEdit.filter(i => i.id !== dataItem.id)
        });
    }

    CommandCell = MyCommandCell(this.enterEdit, this.remove, this.save, this.cancel, this.addChild, editField);

    onItemChange = (event) => {
      this.setState({
          data: mapTree(
              this.state.data,
              subItemsField,
              item => item.id === event.dataItem.id ?
                  extendDataItem(item, subItemsField, { [event.field]: event.value }) : item
          )
      });
    }

    createNewItem = () => {
        const timestamp = new Date().getTime();
        return { id: timestamp, isNew: true };
    }

    onExpandChange = (e) => {
        this.setState({
            expanded: e.value ?
                this.state.expanded.filter(id => id !== e.dataItem.id) :
                [ ...this.state.expanded, e.dataItem.id ]
        });
    }

    render() {
        const { data, expanded, inEdit } = this.state;
        const callback = item =>
            // expanded.includes(item.id) ? extendDataItem(item, subItemsField, { [expandField]: true }) : item;
             extendDataItem(item, subItemsField, {
                [expandField]: expanded.includes(item.id),
                [editField]: Boolean(inEdit.find(i => i.id === item.id))
            });

        return (
            <TreeList
                style={{ maxHeight: '510px', overflow: 'auto' }}
                data={mapTree(data, subItemsField, callback)}
                // data={mapTree(data, subItemsField, item =>
                //     extendDataItem(item, subItemsField, {
                //         [expandField]: expanded.includes(item.id),
                //         [editField]: Boolean(inEdit.find(i => i.id === item.id))
                //     }))
                // }
                editField={editField}
                expandField={expandField}
                subItemsField={subItemsField}
                onItemChange={this.onItemChange}
                onExpandChange={this.onExpandChange}
                columns={[
                  { cell: this.CommandCell, width: 360 },
                  ...columns
                ]}
            />
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);


