/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { Table, Button, Row, Collapse, Icon, Col, Dropdown, Menu, Skeleton, Card, Input, Form, Modal } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import './custom.scss'

const { Panel } = Collapse;
const { SubMenu } = Menu;
// const Loader = () => <h4 style={{ textAlign: "center" }}>Products Data is being prepared</h4>;

@connect(({ orders }) => ({ orders }))
class Orders extends React.Component {
  state = {
    // loading: false,
    expandedKeys: [1],
    filterClick: false,
    refund: false,
    details1: [],
    form1: false,
    rowdetail: [],
    visible: false
  }

  componentDidMount() {
    // const _this = this;
    // this.showLoader();
    const { dispatch } = this.props
    // function getData() {
    //   return new Promise((resolve) => {
    //     dispatch({
    //       type: 'orders/GET_LIST'
    //     } => {
    //       resolve(movieData)
    //     })
    //   });
    // }
    // getData()
    //   .then(() => {
    //     this.hideLoader()
    //   })
    dispatch({
      type: 'orders/GET_LIST'
    })
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = this.props;
    console.log("this,props", this.props)
    console.log("Next Props========>,", nextProps)
    if (nextProps.orders.detail !== orders.detail) {
      console.log("HIIIIIIIIIIIIIIII")
      this.setState({
        details1: nextProps.orders.detail
      })
    }
  }

  closeModal = () => {
    this.setState({
      visible: false,
      form1: false
    });
  }

  openModal = () => {
    this.setState({
      visible: true,
    });
  };
  // hideLoader = () => {
  //   this.setState({ loading: false });
  // }

  // showLoader = () => {
  //   this.setState({ loading: true });
  // }

  showall = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'orders/GET_LIST'
    })
    this.setState({
      filterClick: false
    })
  }

  handlerowclick = () => {
    // const { expandedKeys } = this.state;
    // if (expandedKeys[0] !== 1) {
    //   this.setState({
    //     expandedKeys: [1]
    //   })
    // }
    const { refund } = this.state
    console.log(refund)
    console.log("i am clicked")
  }

  handleclick = (id) => {
    const { expandedKeys } = this.state
    if (expandedKeys[0] === id) {
      this.setState({
        expandedKeys: [1],
        refund: false
      })
    }
    else {
      const { dispatch } = this.props
      // this.setState(
      //   {
      //     currentPage: state.paginationCurrentPage,
      //   },
      //   () => {
      //     dispatch({
      //       type: 'blog/GET_LIST',
      //       page: this.state.currentPage,
      //     })
      //   },
      // )
      dispatch({
        type: 'orders/VIEW_DETAIL',
        payload: {
          id
        }
      })
      this.setState({
        expandedKeys: [id],
        refund: false
      })
    }
  }

  namefilterclicked = () => {
    const { dispatch } = this.props
    const values = {
      data: {
        property: "customer",
        name: `${this.name.value}`
      }
    }
    dispatch({
      type: 'orders/GET_FILTER_LIST',
      payload: {
        values
      }
    })
    this.setState({
      filterClick: true
    })
  }

  handleinput = (e, id1) => {
    const { details1 } = this.state
    console.log("details value==>>", details1)
    // console.log("FROM HERE=========> ,", id1)
    // const ar = [];
    // for (item in details1) {
    //   ar.push(details1[item]);
    // }
    // for (const item in details1) {
    //   // this condition is required to prevent moving forward to prototype chain
    //   if (details1.hasOwnProperty(item)) {
    //     ar.push(details1[item]);
    //   }
    // }
    const arr = Object.values(details1)
    // const obj = [...details1];
    // console.log(obj)
    const somearr = [...arr]
    // const obj1 = somearr.find(o => o.id === id1)
    // console.log(obj1)
    const newData = somearr.map(obj => {
      if (obj.id === id1) // check if fieldName equals to cityId
        return {
          ...obj,
          quantity: parseInt(e.target.value, 10),
        }
      return obj
    });
    console.log(newData)
    const newobj = {}
    newData.map((item, index) => {
      newobj[index] = item
      return null
    })
    console.log(newobj)
    // obj1.quantity = parseInt(e.target.value, 10)
    // console.log(obj1)
    // const objIndex = details1.findIndex((obj => obj.id === id1));
    // console.log("Before update: ", details1[objIndex])
    // details1[objIndex].quantity = parseInt(e.target.value, 10)
    // console.log("After update: ", details1[objIndex])
    // let {details11} = details1
    // variants[i] = variant .quantity = parseInt(e.target.value, 10)
    const { orders } = this.props
    console.log("jhgjhghjghj========> ", orders.details)
    this.setState({
      val: e.target.value,
      prodid: id1,
      details1: newobj
    })
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  // onSearch = () => {
  //   // const { searchText, tableData } = this.state
  //   const reg = new RegExp(searchText, 'gi')
  //   this.setState({
  //     filterDropdownVisible: false,
  //     filtered: !!searchText,
  //     data: tableData
  //       .map(record => {
  //         const match = record.name.match(reg)
  //         if (!match) {
  //           return null
  //         }
  //         return {
  //           ...record,
  //           name: (
  //             <span>
  //               {record.name
  //                 .split(reg)
  //                 .map((text, i) =>
  //                   i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
  //                 )}
  //             </span>
  //           ),
  //         }
  //       })
  //       .filter(record => !!record),
  //   })
  // }

  // refSearchInput = node => {
  //   this.searchInput = node
  // }

  handleChange = (value) => {
    let values;
    const { dispatch } = this.props;
    if (value.key === "week" || value.key === "15days") {
      values = {
        data: {
          property: value.key
        }
      }
    }
    else {
      values = {
        data: {
          property: "monthrange",
          months: value.key
        }
      }
    }
    dispatch({
      type: 'orders/GET_FILTER_LIST',
      payload: {
        values
      }
    })
    this.setState({
      filterClick: true
    })
  }

  handleRefund = (id) => {
    this.setState({
      id,
      // expandedKeys: [id],
      refund: true
    })
  }

  handleForm = (id) => {
    const { orders } = this.props
    const somear = [...orders.orders.data]
    const obj1 = somear.find(o => o.id === id)
    console.log(obj1)
    // obj1.quantity = parseInt(e.target.value, 10)
    // console.log(obj1)
    console.log(somear)
    this.setState({
      form1: true,
      visible: true,
      rowid: id,
      rowdetail: obj1
    })
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props
    const { rowid } = this.state
    e.preventDefault();
    let data
    console.log("hi")
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        data = {
          data: {
            shippingAddress: values,
            orderId: rowid
          }
        }
        dispatch({
          type: 'orders/updateShippingAddress',
          payload: {
            data
          }
        })
        this.setState({
          form1: false,
          rowdetail: values
        });
      }
    });
  };

  render() {
    // let count = 0
    // let tp = 0
    // let tq = 0
    let tt = 0
    let ta = 0
    let gt = 0
    let shi = 0
    // const { searchText, filterDropdownVisible, filtered } = this.state
    const { orders, form } = this.props
    const { getFieldDecorator } = form;
    const { expandedKeys, filterClick, refund, id, val, prodid, details1, form1, rowid, rowdetail, visible } = this.state
    console.log(id)
    console.log(rowid)
    console.log("row==>", rowdetail)
    console.log(details1)
    console.log("This=========>", orders.details)
    const menu = (
      <Menu>
        <Menu.Item onClick={this.handleChange} key="week">This week</Menu.Item>
        <Menu.Item onClick={this.handleChange} key="15days">This Fortnight</Menu.Item>
        <SubMenu title="Months">
          <Menu.Item onClick={this.handleChange} key="1">Last One Month</Menu.Item>
          <Menu.Item onClick={this.handleChange} key="2">Last Two Months</Menu.Item>
          <Menu.Item onClick={this.handleChange} key="3">Last Three Months</Menu.Item>
          <Menu.Item onClick={this.handleChange} key="4">Last Four Months</Menu.Item>
          <Menu.Item onClick={this.handleChange} key="5">Last Five Months</Menu.Item>
          <Menu.Item onClick={this.handleChange} key="6">Last Six Months</Menu.Item>
        </SubMenu>
      </Menu>
    );

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //   },
    // };

    const columns = [
      {
        title: 'Order Number',
        dataIndex: 'orderNumber',
        key: 'number',
        render: text => (
          <p>
            {text ? `#${text}` : `#000000`}
          </p>
        ),
        sorter: (a, b) => parseInt(a.orderNumber, 10) - parseInt(b.orderNumber, 10),
      },
      {
        title: 'Order Date',
        dataIndex: 'meta.timestamps.created_at',
        key: 'date',
        render: text => (
          <p>  {JSON.stringify(new Date(text)).slice(1, 11)}
          </p>
        )

      },
      {
        title: 'Customer Name',
        dataIndex: 'customer.name',
        key: 'customername',
        render: text => (
          <p>
            {text ? `${text}` : ''}
          </p>
        ),
        // sorter: (a, b) => a.name.length - b.name.length,
        // render: text => (
        //   <a className="utils__link--underlined" href="javascript: void(0);">
        //     {text}
        //   </a>
        // ),
        // filterDropdown: (
        //   <div className="custom-filter-dropdown">
        //     <Input
        //       ref={this.refSearchInput}
        //       placeholder="Search name"
        //       value={searchText}
        //       onChange={this.onInputChange}
        //       onPressEnter={this.onSearch}
        //     />
        //     <Button type="primary" onClick={this.onSearch}>
        //       Search
        //     </Button>
        //   </div>
        // ),
        // filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        // filterDropdownVisible,
        // onFilterDropdownVisibleChange: visible => {
        //   this.setState(
        //     {
        //       filterDropdownVisible: visible,
        //     },
        //     () => this.searchInput && this.searchInput.focus(),
        //   )
        // },
      },
      {
        title: 'Grand Total',
        dataIndex: 'meta.display_price.with_tax.formatted',
        key: 'total',
        render: text => <p>{`${text}`}</p>,
        sorter: (a, b) => parseInt(a.meta.display_price.with_tax.amount, 10) - parseInt(b.meta.display_price.with_tax.amount, 10),
      },
      {
        title: 'Payment Status',
        dataIndex: 'payment',
        key: 'status',
        render: (text) => (
          <p
            className={
              text === 'paid'
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {text}
          </p>
        ),
        filters: [
          {
            text: 'Paid Orders',
            value: 'paid',
          },
          {
            text: 'Unpaid Orders',
            value: 'unpaid',
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.payment.indexOf(value) === 0,
      },
      // {
      //   title: 'Shipping Status',
      //   dataIndex: 'shipping',
      //   key: 'shipstatus',
      //   render: (text) => (
      //     <p
      //       className={
      //         text === 'fulfilled'
      //           ? 'font-size-12 badge badge-primary'
      //           : 'font-size-12 badge badge-default'
      //       }
      //     >
      //       {text}
      //     </p>
      //   ),
      //   filters: [
      //     {
      //       text: 'Unfulfilled Orders',
      //       value: 'unfulfilled',
      //     },
      //     {
      //       text: 'Partially Fulfilled Orders',
      //       value: 'partiallyfulfilled',
      //     },
      //     {
      //       text: 'Unfulfilled Orders',
      //       value: 'unfulfilled',
      //     }
      //   ],
      //   filterMultiple: false,
      //   onFilter: (value, record) => record.payment.indexOf(value) === 0,
      // },
      {
        title: 'Order Status',
        dataIndex: 'status',
        key: 'orderstatus',
        render: (text) => (
          <p
            className={
              text === 'complete'
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {text}
          </p>
        ),
        filters: [
          {
            text: 'Completed Orders',
            value: 'complete',
          },
          {
            text: 'InComplete Orders',
            value: 'incomplete',
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.payment.indexOf(value) === 0,
      },
      // {
      //   title: 'Shipping Status',
      //   dataIndex: 'shipping',
      //   key: 'shippingstatus',
      //   render: (text) => (
      //     <span
      //       className={
      //         text === 'fulfilled'
      //           ? 'font-size-12 badge badge-primary'
      //           : 'font-size-12 badge badge-default'
      //       }
      //     >
      //       {text}
      //     </span>
      //   ),
      //   filters: [
      //     {
      //       text: 'Fulfilled Orders',
      //       value: 'fulfilled',
      //     },
      //     {
      //       text: 'Unfulfilled Orders',
      //       value: 'unfulfilled',
      //     }
      //   ],
      //   filterMultiple: false,
      // onClick={() => this.handleclick(id)} icon="edit"
      //   onFilter: (value, record) => record.shipping.indexOf(value) === 0,
      // },
      {
        title: 'Actions',
        key: 'actions',
        dataIndex: 'id',
        render: (id1, record) => (
          <p>
            <Button onClick={() => this.handleclick(id1)} icon="edit" className="mr-1" size="small">
              View
            </Button>
            {record.status === "complete" ?
              <Button className="mr-1" size="small" icon="undo" onClick={() => this.handleRefund(id1)}>
                Initiate Refund
              </Button> :
              null
            }
          </p>
        ),
      },
    ]

    let arr = []
    let somearr = []
    let obj1 = {}
    // let arr1 = []
    // let somearr1 = []
    // let obj2 = {}

    const columns1 = [
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        render: text => (
          <p>
            {text ? `${text}` : 'NA'}
          </p>
        ),
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        render: text => (
          <p>
            {text ? `${text}` : 'NA'}
          </p>
        ),
      },
      {
        title: 'Tracking ID',
        dataIndex: 'trackingID',
        key: 'trackid',
        render: text => (
          <p>
            {text ? `${text}` : 'NA'}
          </p>
        ),
      },
      {
        title: 'Vendor ID',
        dataIndex: 'vendorOrderId',
        key: 'vendorid',
        render: text => (
          <p>
            {text ? `${text}` : 'NA'}
          </p>
        ),
      },
      {
        title: 'Carrier',
        dataIndex: 'carrier',
        key: 'carrier',
        render: text => (
          <p>
            {text ? `${text}` : 'NA'}
          </p>
        ),
      },
      {
        title: 'Per Unit Price',
        dataIndex: 'meta.display_price.without_tax.unit.formatted',
        key: 'without',
        render: text => <p>{`${text}`} </p>,
        sorter: (a, b) => parseInt(a.meta.display_price.without_tax.unit.amount, 10) - parseInt(b.meta.display_price.without_tax.unit.amount, 10),
      },
      {
        title: 'Product Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text, record) => {
          arr = Object.values(details1)
          somearr = [...arr]
          obj1 = somearr.find(o => (o.id === record.id))
          /* record.id === prodid && {prodid ? console.log("This is printed", details.orders.data.find(o => o.id === prodid).quantity) : null} */
          /* {parseInt(text, 10) !== parseInt(obj1.quantity, 10) ? <span> <strike style={{ color: "red" }}> {text} </strike> {val} </span> : `${text}`} */
          // { refund && record.name !== "Shipping Charges" ? <Input style={{ width: "80px" }} type="number" min="0" max={parseInt(text, 10)} onChange={(e) => this.handleinput(e, record.id)} /> : null }
          return (
            <p>
              {/* {text} */}
              {parseInt(text, 10) !== parseInt(obj1.quantity, 10) ? <span> <strike style={{ color: "red" }}> {text} </strike> {obj1.quantity} </span> : `${text}`}
              {refund && record.name !== "Shipping Charges" ? <Input style={{ width: "60px" }} type="number" min="0" max={parseInt(text, 10)} onChange={(e) => this.handleinput(e, record.id)} /> : null}
            </p>
          )
        },
        sorter: (a, b) => parseInt(a.quantity, 10) - parseInt(b.quantity, 10),
      },
      {
        title: 'Product Price',
        dataIndex: 'meta.display_price.without_tax.value.formatted',
        key: 'without',
        render: (text, record) => {
          return (
            <p>
              {/* {`${text}`} {console.log(prodid)}{console.log(record)} */}
              {parseInt(obj1.quantity, 10) !== parseInt(record.quantity, 10) ? <p> <strike style={{ color: "red" }}>{text} </strike> ${parseFloat((obj1.quantity * record.meta.display_price.without_tax.unit.amount) / 100).toFixed(2)} </p> : `${text}`}
            </p>
          )
        },
        sorter: (a, b) => parseInt(a.meta.display_price.without_tax.value.amount, 10) - parseInt(b.meta.display_price.without_tax.value.amount, 10),
      },
      {
        title: 'Tax',
        dataIndex: 'meta.display_price.tax.value.formatted',
        key: 'tax',
        // render: text => <p>{`${text}`} </p>,
        render: (text, record) => {
          return (
            <p>
              {/* {`${text}`} {console.log(prodid)}{console.log(record)} */}
              {parseInt(obj1.quantity, 10) !== parseInt(record.quantity, 10) && record.meta.display_price.tax.value.amount > 0 ? <p> <strike style={{ color: "red" }}>{text} </strike> ${parseFloat((obj1.quantity * record.meta.display_price.tax.unit.amount) / 100).toFixed(2)} </p> : `${text}`}
            </p>
          )
        },
        sorter: (a, b) => parseInt(a.meta.display_price.tax.value.amount, 10) - parseInt(b.meta.display_price.tax.value.amount, 10),
      },
      {
        title: 'Product Total',
        dataIndex: 'meta.display_price.with_tax.value.formatted',
        key: 'with',
        render: (text, record) => {
          return (
            <p>
              {/* {`${text}`} {console.log(prodid)}{console.log(record)} */}
              {parseInt(obj1.quantity, 10) !== parseInt(record.quantity, 10) ? <p> <strike style={{ color: "red" }}>{text} </strike> ${parseFloat((obj1.quantity * record.meta.display_price.with_tax.unit.amount) / 100).toFixed(2)} </p> : `${text}`}
            </p>
          )
        },
        sorter: (a, b) => parseInt(a.meta.display_price.with_tax.value.amount, 10) - parseInt(b.meta.display_price.with_tax.value.amount, 10),
      }
    ]

    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      // marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };

    return (
      <div>
        <Helmet title="Orders" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Orders</strong>
            </div>
          </div>
          <div className="card-body">
            <Collapse
              accordion
              style={{ width: "50%", textAlign: "center", margin: "auto" }}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
              <Panel header="Filter Panel" key="1" style={customPanelStyle}>
                <div style={{ backgroundColor: '#f7f7f7' }}>
                  <h5> Choose a Filter </h5>
                  <br />
                  <Dropdown overlay={menu}>
                    <span>
                      Filter Dropdown &nbsp; <Icon type="down" />
                    </span>
                  </Dropdown>
                </div>
                <br />
                <p> OR </p>
                <div style={{ backgroundColor: '#f7f7f7' }}>
                  Filter by Customer Name: &nbsp;
                  <span>
                    <input
                      style={{ width: "10vw", margin: "auto", borderRadius: "10%" }}
                      // className="form-control name"
                      ref={(n) => { this.name = n; }}
                      type="text"
                    />
                    &nbsp;
                    <Button type="primary" onClick={this.namefilterclicked}> Filter </Button>
                  </span>
                </div>
              </Panel>
            </Collapse>
            <br />
            {filterClick ?
              <div style={{ marginLeft: "48%" }}><Button type="primary" onClick={this.showall}> Reset Filters </Button>
              </div> : null}
            <br />
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              columns={columns}
              expandedRowKeys={expandedKeys}
              dataSource={orders.orders.data}
              onChange={this.handleTableChange}
              expandIconAsCell={false}
              expandIconColumnIndex={20}
              rowKey={record => record.id}
              onRow={(record) => {
                return {
                  onClick: () => this.handlerowclick(record)
                };
              }}
              expandedRowRender={(record) =>
                // <div style={{ backgroundColor: "#ffffff" }}>
                <Card style={{ boxShadow: "inset 0 0 3px #000000" }}>
                  {orders.details.orders ?
                    <div>
                      <Row>
                        <Table
                          className="tableproduct"
                          rowClassName="rowproduct"
                          bordered
                          scroll={{ x: '100%' }}
                          columns={columns1}
                          dataSource={orders.details.orders.data}
                          rowKey={record1 => record1.product_id}
                          pagination={{ hideOnSinglePage: true }}
                        />
                      </Row>

                      <Row style={{ height: "150px" }}>
                        {console.log(val, prodid)}
                        {/* {arr1 = Object.values(details1)} */}
                        {/* {somearr1 = [...arr1]} */}
                        {/* {orders.details.orders.data.map((item) => {
                          // obj2 = somearr1.find(o => (o.id === item.id))
                          // console.log(obj2)
                          Object.keys(details1).forEach(key => {
                            console.log(details1[key]);
                            ta += (details1[key].quantity * details1[key].meta.display_price.without_tax.unit.amount)
                            // tq += item.quantity
                            tt += (details1[key].quantity * details1[key].meta.display_price.tax.unit.amount)
                            gt += (details1[key].quantity * details1[key].meta.display_price.with_tax.unit.amount)
                          });
                          console.log("qqqqqqqqqqq===>", somearr, arr)
                          // if (item.id === prodid) {
                          //   ta += (val * item.meta.display_price.without_tax.unit.amount)
                          //   // tq += item.quantity
                          //   tt += (val * item.meta.display_price.tax.unit.amount)
                          //   gt += (val * item.meta.display_price.with_tax.unit.amount)
                          // } else {
                          //   ta += item.meta.display_price.without_tax.value.amount
                          //   // tq += item.quantity
                          //   tt += item.meta.display_price.tax.value.amount
                          //   gt += item.meta.display_price.with_tax.value.amount
                          // }
                          // ta += (item.quantity * item.meta.display_price.without_tax.unit.amount)
                          // tq += item.quantity
                          // tt += (item.quantity * item.meta.display_price.tax.unit.amount)
                          // gt += (item.quantity * item.meta.display_price.with_tax.unit.amount)
                          if (item.name === "Shipping Charges") {
                            shi += item.meta.display_price.without_tax.value.amount;
                            ta -= item.meta.display_price.without_tax.value.amount
                            // tq -= item.quantity
                            // tt -= item.meta.display_price.tax.value.amount
                          }


                          return null
                        })} */}

                        {Object.keys(details1).forEach(key => {
                          console.log(details1[key]);
                          ta += (details1[key].quantity * details1[key].meta.display_price.without_tax.unit.amount)
                          // tq += item.quantity
                          tt += (details1[key].quantity * details1[key].meta.display_price.tax.unit.amount)
                          gt += (details1[key].quantity * details1[key].meta.display_price.with_tax.unit.amount)
                          if (details1[key].name === "Shipping Charges") {
                            shi += details1[key].meta.display_price.without_tax.value.amount;
                            ta -= details1[key].meta.display_price.without_tax.value.amount
                            // tq -= item.quantity
                            // tt -= item.meta.display_price.tax.value.amount
                          }
                        })}
                        {/* {arr1 = Object.values(details1)}
                        {somearr1 = [...arr1]}
                        {console.log("somearr", somearr1)}
                        {somearr1.map((item) => {
                          console.log("These are the items", item)
                          ta += (item.quantity * item.meta.display_price.without_tax.unit.amount)
                          // tq += item.quantity
                          tt += (item.quantity * item.meta.display_price.tax.unit.amount)
                          gt += (item.quantity * item.meta.display_price.with_tax.unit.amount)
                          console.log("gg", ta, tt, gt, shi)
                          // else {
                          //   ta += item.meta.display_price.without_tax.value.amount
                          //   // tq += item.quantity
                          //   tt += item.meta.display_price.tax.value.amount
                          //   gt += item.meta.display_price.with_tax.value.amount
                          // }

                          if (item.name === "Shipping Charges") {
                            shi += item.meta.display_price.without_tax.value.amount;
                            ta -= item.meta.display_price.without_tax.value.amount
                            // tq -= item.quantity
                            // tt -= item.meta.display_price.tax.value.amount
                          }


                          return null
                        })} */}
                        <Card style={{ marginTop: "0.2%", width: "300px", position: "absolute", right: "0", overflow: "auto", backgroundColor: "rgb(235, 235, 245)" }}>
                          <table>
                            <tbody>
                              <tr>
                                <td style={{ textAlign: "center" }}> Total Amount - {console.log(ta)}</td>
                                <td style={{ width: "96px", paddingLeft: "8px", borderLeft: "1px solid #e8e8e8" }}> ${parseFloat(ta / 100).toFixed(2)} </td>
                              </tr>
                              <tr>
                                <td style={{ textAlign: "center" }}> Total Tax Amount - </td>
                                <td style={{ width: "96px", paddingLeft: "8px", borderLeft: "1px solid #e8e8e8" }}> {ta !== 0 ? `$${parseFloat(tt / 100).toFixed(2)}` : `$0.00`}</td>
                              </tr>
                              <tr>
                                <td style={{ textAlign: "center" }}> Shipping Charges - </td>
                                <td style={{ width: "96px", paddingLeft: "8px", borderLeft: "1px solid #e8e8e8" }}> {shi === 0 || ta === 0 ? "Free" : `$${parseFloat(shi / 100).toFixed(2)}`}</td>
                              </tr>
                              <tr>
                                <td style={{ textAlign: "center" }}> Grand Total - </td>
                                <td style={{ width: "96px", paddingLeft: "8px", borderLeft: "1px solid #e8e8e8" }}> {ta !== 0 ? `$${parseFloat(gt / 100).toFixed(2)}` : `$0.00`} </td>
                              </tr>
                            </tbody>
                          </table>
                          {/* <div>
                            
                            <p> Total Amount - ${parseFloat(ta / 100).toFixed(2)} </p>
                            <p>Total Tax Amount - ${tt / 100} </p>
                            {shi === 0 ?
                              <p style={{ textAlign: "left !important" }}> Shipping Charges - Free </p>
                              :
                              <p style={{ textAlign: "left !important" }}> Shipping Charges - ${parseFloat(shi / 100).toFixed(2)} </p>}
                            <p> Grand Total - ${parseFloat(gt / 100).toFixed(2)} </p>
                          </div> */}
                        </Card>
                      </Row>
                    </div> : <Skeleton active />}
                  {/* <hr /> */}
                  <br />

                  {/* {orders.details.orders ? orders.details.orders.data.map((item) => {
                    if (item.trackingID === null) {
                      count += 1;
                    }
                    return null
                  }) : null} */}
                  {/* <Row style={{ display: "flex", justifyContent: "center", paddingBottom: "1%" }}> */}
                  {/* <Col span={12} style={{ textAlign: "left" }}> */}
                  {/* <div>
                      <Card title="Billing Address">
                        <p>{record.billing_address.first_name}&nbsp;{record.billing_address.last_name}</p>
                        <p> {record.billing_address.line_1}</p>
                        <p>{record.billing_address.line_2}</p>
                        <p>  {record.billing_address.city}
                          , {record.billing_address.county}
                        </p>
                        <p>  {record.billing_address.country}
                          , {record.billing_address.postcode}
                        </p>
                      </Card> */}
                  {/* </Col> */}
                  {/* </div> */}
                  {/* <Col span={12}> */}
                  {/* <div style={{ marginLeft: "1%" }}>
                      <Card title="Shipping Address">

                        <p>{record.shipping_address.first_name}&nbsp;{record.shipping_address.last_name} </p>
                        <p> {record.shipping_address.line_1} </p>
                        <p>   {record.shipping_address.line_2} </p>
                        <p>  {record.shipping_address.city}
                          , {record.shipping_address.county}
                        </p>
                        <p>  {record.shipping_address.country}
                          , {record.shipping_address.postcode}
                        </p>
                      </Card>
                    </div> */}
                  {/* </Col> */}
                  {/* <Col span={8} style={{ textAlign: "left" }}>
                      <Card className="cardstatus" title="Shipping Details">
                        {orders.details.orders ?
                          <div className="divstatus">

                            {/* {orders.details.orders.data.length === count ?
                              (<p> Status - Unfulfilled </p>) : null}
                            {count === 0 ?
                              (<p> Shipping Status - Fulfilled </p>) : null}
                            {count > 0 && count < orders.details.orders.data.length ?
                              (<p> Partially Fulfilled </p>) : null} 
                            NA
                          </div> : <Skeleton active />}
                      </Card>
                    </Col> */}
                  {/* </Row> */}
                  {/* </Row> */}
                  {/* <Sider > */}
                  <Collapse
                    accordion
                    bordered={false}
                    style={{ margin: "auto" }}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                  >
                    <Panel header="Other Details" key="1" style={customPanelStyle}>
                      <Row>
                        <Col span={6}>
                          <div>
                            <Card title="Billing Address" className="card1">
                              <p>{record.billing_address.first_name}&nbsp;{record.billing_address.last_name}</p>
                              <p> {record.billing_address.line_1}</p>
                              <p>{record.billing_address.line_2}</p>
                              <p>  {record.billing_address.city}
                                , {record.billing_address.county}
                              </p>
                              <p>  {record.billing_address.country}
                                , {record.billing_address.postcode}
                              </p>
                            </Card>
                          </div>
                        </Col>
                        <Col span={6}>
                          {form1 ?
                            <div style={{ marginLeft: "5%" }}>
                              <Modal className="Modal" onOk={this.handleSubmit} onCancel={this.closeModal} visible={visible} title="Edit Shipping Address">
                                <Card>
                                  {/* <Form onSubmit={this.handleSubmit} {...formItemLayout}> */}
                                  <Form layout="vertical">
                                    <Form.Item label="First Name">
                                      {getFieldDecorator('shipping_address.first_name', {
                                        initialValue: rowdetail.shipping_address.first_name,
                                        rules: [
                                          {
                                            required: true,
                                            message: 'Please input your First-Name!!',
                                          },
                                        ],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="Last Name">
                                      {getFieldDecorator('shipping_address.last_name', {
                                        initialValue: rowdetail.shipping_address.last_name,
                                        rules: [
                                          {
                                            required: true,
                                            message: 'Please input your Last-Name!!',
                                          },
                                        ],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="Line 1">
                                      {getFieldDecorator('shipping_address.line_1', {
                                        initialValue: rowdetail.shipping_address.line_1,
                                        rules: [
                                          {
                                            required: true,
                                            message: 'Please input Line1 of address!!',
                                          },
                                        ],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="Line2">
                                      {getFieldDecorator('shipping_address.line_2', {
                                        initialValue: rowdetail.shipping_address.line_2,
                                        // rules: [
                                        //   {
                                        //     required: true,
                                        //     message: 'Please input your First-Name!!',
                                        //   },
                                        // ],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="City">
                                      {getFieldDecorator('shipping_address.city', {
                                        initialValue: rowdetail.shipping_address.city,
                                        rules: [
                                          {
                                            required: true,
                                            message: 'Please input your City!!',
                                          },
                                        ],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="County">
                                      {getFieldDecorator('shipping_address.county', {
                                        initialValue: rowdetail.shipping_address.county,
                                        // rules: [
                                        //   {
                                        //     required: true,
                                        //     message: 'Please input your First-Name!!',
                                        //   },
                                        // ],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="Country">
                                      {getFieldDecorator('shipping_address.country', {
                                        initialValue: rowdetail.shipping_address.country,
                                        rules: [
                                          {
                                            required: true,
                                            message: 'Please input your Country!!',
                                          },
                                        ],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="Zip Code">
                                      {getFieldDecorator('shipping_address.postcode', {
                                        initialValue: rowdetail.shipping_address.postcode,
                                        rules: [
                                          {
                                            required: true,
                                            message: 'Please input Postal Code!!',
                                          },
                                        ],
                                      })(<Input />)}
                                    </Form.Item>
                                    {/* <Button type="primary" htmlType="submit" onClick={this.handleSubmit}> Update </Button> */}
                                  </Form>
                                </Card>
                              </Modal>
                            </div> :
                            <div style={{ marginLeft: "5%" }}>
                              <Card title="Shipping Address" className="card1" extra={<Icon type="edit" onClick={() => this.handleForm(record.id)} />}>
                                <p>{rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.first_name : record.shipping_address.first_name}&nbsp;{rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.last_name : record.shipping_address.last_name} </p>
                                <p> {rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.line_1 : record.shipping_address.line_1} </p>
                                <p>   {rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.line_2 : record.shipping_address.line_2} </p>
                                <p>  {rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.city : record.shipping_address.city}
                                  , {rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.county : record.shipping_address.county}
                                </p>
                                <p>  {rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.country : record.shipping_address.country}
                                  , {rowdetail.shipping_address && record.id === rowid ? rowdetail.shipping_address.postcode : record.shipping_address.postcode}
                                </p>
                              </Card>
                            </div>}
                        </Col>

                        <Col span={6}>
                          <div style={{ marginLeft: "5%" }}>
                            <Card title="Customer Details" className="card1" style={{ height: "264px" }}>
                              <p>{record.customer.name} </p>
                              <p> {record.customer.email} </p>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                  {/* <Tabs tabPosition="left" style={{ marginLeft: "6%" }}>
                    <TabPane tab="Billing Address" key="1">
                      <Card title="Billing Address" className="card1">
                        <div className="carddiv">
                          <p>{record.billing_address.first_name}&nbsp;{record.billing_address.last_name}</p>
                          <p> {record.billing_address.line_1}</p>
                          <p>{record.billing_address.line_2}</p>
                          <p>  {record.billing_address.city}
                            , {record.billing_address.county}
                          </p>
                          <p>  {record.billing_address.country}
                            , {record.billing_address.postcode}
                          </p>
                        </div>
                      </Card>
                    </TabPane>
                    <TabPane tab="Shipping Address" key="2">
                      <Card title="Shipping Address" className="card1">
                        <div className="carddiv">
                          <p>{record.shipping_address.first_name}&nbsp;{record.shipping_address.last_name} </p>
                          <p> {record.shipping_address.line_1} </p>
                          <p>   {record.shipping_address.line_2} </p>
                          <p>  {record.shipping_address.city}
                            , {record.shipping_address.county}
                          </p>
                          <p>  {record.shipping_address.country}
                            , {record.shipping_address.postcode}
                          </p>
                        </div>
                      </Card>
                    </TabPane>
                  </Tabs> */}
                  {/* <Row>
                    <Col span={8} style={{ marginLeft: "17%" }}>
                      <div>
                        <Card title="Billing Address">
                          <p>{record.billing_address.first_name}&nbsp;{record.billing_address.last_name}</p>
                          <p> {record.billing_address.line_1}</p>
                          <p>{record.billing_address.line_2}</p>
                          <p>  {record.billing_address.city}
                            , {record.billing_address.county}
                          </p>
                          <p>  {record.billing_address.country}
                            , {record.billing_address.postcode}
                          </p>
                        </Card>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div style={{ marginLeft: "1%" }}>
                        <Card title="Shipping Address">
                          <p>{record.shipping_address.first_name}&nbsp;{record.shipping_address.last_name} </p>
                          <p> {record.shipping_address.line_1} </p>
                          <p>   {record.shipping_address.line_2} </p>
                          <p>  {record.shipping_address.city}
                            , {record.shipping_address.county}
                          </p>
                          <p>  {record.shipping_address.country}
                            , {record.shipping_address.postcode}
                          </p>
                        </Card>
                      </div>
                    </Col>
                  </Row> */}
                  {/* </Sider> */}
                </Card>
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(Orders);
