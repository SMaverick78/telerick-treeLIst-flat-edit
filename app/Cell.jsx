import React from 'react';
// import get from 'lodash/get';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const Cell = props => {
  const {
    dataItem,
    colSpan,
    field,
    hasChildren,
    level = [0],
    expanded,
    format
  } = props;
//   const cellData = dataItem[field];
  // headerCell: MyCell

//   const isDataItem = dataItem.rowType === 'SECTION' ? dataItem[field] && (dataItem[field].shortName || dataItem[field].name) : dataItem.acmCostItem.shortName

// const planUnitNumber = dataItem.tender.periods.planned.plan.unitNumber;

// console.log(dataItem)
// console.log(dataItem.acmForm)

// console.log('field', field)

// console.log('dataItem', dataItem)
 

// console.log(dataItem[field]  && field !== 'material' ? dataItem.acmCostItem.shortName : 1111111111111111 )

// const cellData = dataItem[field];

// if (!dataItem[field]) {
//   return <td {...props} />
// };



  // const data = get(dataItem, field);
  const data = dataItem[field];
  // const rowData = field === 'material.name' && dataItem.name;
  let dataAsString = '';

  if (data !== undefined && data !== null) {
      dataAsString = format ?
          provideIntlService(this).format(format, data) :
          data.toString();
  }

  const icons = [];

  if (props.expandable) {
      // icons.push(...level.slice(1).map((_x, i) => (<span className="k-icon k-i-none" key={i} />)));
      const IconTagName = expanded ? ExpandMore : ExpandLess;
      const handlerClick = event => props.onExpandChange(event, dataItem);

      if (hasChildren) {
          icons.push(
              <IconButton
                size={'small'}
                key={'expand-collapse'}
                onClick={handlerClick}
              >
                <IconTagName fontSize={'small'} />
              </IconButton>
          );
      }
  }

  // const isAlignCenter = (!rowData && field !== 'orderNumber') ? 'center' : 'left';
 const isClassName = field && (field.includes('tender') && 'k-style-cell-tender' || field.includes('expertise') && 'k-style-cell-expertise' || field.includes('approval') && 'k-style-cell-approval');

  return (
      <td
        colSpan={colSpan}
        className={isClassName}
        style={props.style}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent :"flex-start",
        }}
        >
          {icons}
          <Typography
            variant={'body2'}
          >
            {dataAsString} <br />
            {/* { isColor && field} */}
          </Typography>
        </div>
      </td>
  );
};

export default Cell;


