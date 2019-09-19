/* eslint no-underscore-dangle: 0 */
import React from 'react'
import { Table, Button, Row, Collapse, Icon, Col, Dropdown, Menu, Skeleton, Card } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import './custom.scss'

const { Panel } = Collapse;
const { SubMenu } = Menu;
// const { TabPane } = Tabs;
// const Loader = () => <h4 style={{ textAlign: "center" }}>Products Data is being prepared</h4>;

@connect(({ orders }) => ({ orders }))
class Orders extends React.Component {
  state = {
    // loading: false,
    expandedKeys: [1],
    filterClick: false
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

  handleclick = (id) => {
    const { expandedKeys } = this.state
    if (expandedKeys[0] === id) {
      this.setState({
        expandedKeys: [1]
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
        expandedKeys: [id]
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

  render() {
    // let count = 0
    // const { searchText, filterDropdownVisible, filtered } = this.state
    const { orders } = this.props
    const { expandedKeys, filterClick } = this.state

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
        render: (text, record) => (
          <p
            className={
              text === 'paid'
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {console.log(record)}
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
        render: (id, record) => (
          <p>
            <Button onClick={() => this.handleclick(id)} icon="edit" className="mr-1" size="small">
              View
            </Button>
            {record.status === "complete" ?
              <Button className="mr-1" size="small" icon="undo">
                Initiate Refund
              </Button> :
              null
            }
          </p>
        ),
      },
    ]

    const columns1 = [
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        render: text => (
          <p>
            {text ? `${text}` : ''}
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
        title: 'Product Price',
        dataIndex: 'meta.display_price.with_tax.unit.formatted',
        key: 'total',
        render: text => <p>{`${text}`} </p>,
        sorter: (a, b) => parseInt(a.meta.display_price.with_tax.unit.amount, 10) - parseInt(b.meta.display_price.with_tax.unit.amount, 10),
      },
      {
        title: 'Product Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: text => <p> {`${text}`}</p>,
        sorter: (a, b) => parseInt(a.quantity, 10) - parseInt(b.quantity, 10),
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
                    <a href="#">
                      Filter Dropdown &nbsp; <Icon type="down" />
                    </a>
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
                          rowKey={record1 => record1.id}
                          pagination={{ hideOnSinglePage: true }}
                        />
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
                          <div style={{ marginLeft: "5%" }}>
                            <Card title="Shipping Address" className="card1">
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

export default Orders
