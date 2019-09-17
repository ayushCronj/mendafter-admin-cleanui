/* eslint no-underscore-dangle: 0 */
import React from 'react'
import { Table, Button, Row, Col, Collapse, Icon, Dropdown, Menu, Skeleton } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

const { Panel } = Collapse;
const { SubMenu } = Menu;
// const Loader = () => <h4 style={{ textAlign: "center" }}>Products Data is being prepared</h4>;
// const Loader1 = () => <div> <h3>Products are being loaded..!!</h3></div>;

@connect(({ orders }) => ({ orders }))
class Orders extends React.Component {
  state = {
    // loading: false,
    expandedKeys: [1],
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
  }

  render() {
    // const { searchText, filterDropdownVisible, filtered } = this.state
    const { orders } = this.props
    const { expandedKeys } = this.state

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
        render: text => <span>{`${text}`}</span>,
        sorter: (a, b) => parseInt(a.meta.display_price.with_tax.amount, 10) - parseInt(b.meta.display_price.with_tax.amount, 10),
      },
      {
        title: 'Payment Status',
        dataIndex: 'payment',
        key: 'status',
        render: (text) => (
          <span
            className={
              text === 'paid'
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {text}
          </span>
        ),
        filters: [
          {
            text: 'paid',
            value: 'paid',
          },
          {
            text: 'unpaid',
            value: 'unpaid',
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.payment.indexOf(value) === 0,
      },
      {
        title: 'Shipping Status',
        dataIndex: 'shipping',
        key: 'shippingstatus',
        render: (text) => (
          <span
            className={
              text === 'fulfilled'
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {text}
          </span>
        ),
        filters: [
          {
            text: 'Fulfilled',
            value: 'fulfilled',
          },
          {
            text: 'Unfulfilled',
            value: 'unfulfilled',
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.shipping.indexOf(value) === 0,
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'id',
        render: (id) => (
          <span>
            <Button onClick={() => this.handleclick(id)} icon="edit" className="mr-1" size="small">
              View
            </Button>
          </span>
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
        render: text => <span>{`${text}`}</span>,
        sorter: (a, b) => parseInt(a.meta.display_price.with_tax.unit.amount, 10) - parseInt(b.meta.display_price.with_tax.unit.amount, 10),
      },
      {
        title: 'Product Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      }
    ]

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
              style={{ width: "40vw", textAlign: "center", marginLeft: "28%" }}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
              <Panel header="Filter Panel" key="1">
                <h5> <u>Choose a Filter </u></h5>
                <br />
                <div>
                  <Dropdown overlay={menu}>
                    <a href="#">
                      Filter Dropdown &nbsp; <Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
                <br />
                <p> OR </p>
                <div> Filter by Customer Name: &nbsp;
                  <input
                    // style={{ width: "10vw" }}
                    className="form-control name"
                    ref={(n) => { this.name = n; }}
                    type="text"
                  />
                  &nbsp;
                  <Button type="primary" onClick={this.namefilterclicked}>Filter </Button>
                </div>
              </Panel>
            </Collapse>
            <br />
            <div style={{ marginLeft: "48%" }}><Button type="primary" onClick={this.showall}> Show All </Button>
            </div>
            <br />
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              columns={columns}
              expandedRowKeys={expandedKeys}
              dataSource={orders.orders.data}
              onChange={this.handleTableChange}
              expandIconAsCell={false}
              expandIconColumnIndex={7}
              rowKey={record => record.id}
              expandedRowRender={(record) =>
                <div>
                  <h2 style={{ textAlign: "center" }}> <u> Order Number - {record.orderNumber}</u></h2>
                  <br />
                  <Row>
                    <Col span={12} style={{ textAlign: "center" }}>
                      <h4> <u>Billing Details </u></h4>
                      <p><strong>Name : </strong>{record.billing_address.first_name}&nbsp;{record.billing_address.last_name}</p>
                      <p><strong>Address :</strong> </p>
                      <p>Line 1 : {record.billing_address.line_1}</p>
                      <p>Line 2 :{record.billing_address.line_2}</p>
                      <p> City: {record.billing_address.city}</p>
                      <p> County: {record.billing_address.county}</p>
                      <p> Country: {record.billing_address.country}</p>
                      <p> Postal Code: {record.billing_address.postcode}</p>
                    </Col>
                    <Col span={12} style={{ textAlign: "center" }}>
                      <h4> <u>Shipping Details </u></h4>
                      <p><strong>Name: </strong>{record.shipping_address.first_name}&nbsp;{record.shipping_address.last_name} </p>
                      <p> <strong> Address: </strong></p>
                      <p> Line 1: {record.shipping_address.line_1} </p>
                      <p>  Line 2: {record.shipping_address.line_2} </p>
                      <p>  City: {record.shipping_address.city}</p>
                      <p> County: {record.shipping_address.county}</p>
                      <p>   Country : {record.shipping_address.country}</p>
                      <p>Postal Code : {record.shipping_address.postcode}</p>
                      <p> Phone Number : {record.shipping_address.phone_number ? record.shipping_address.phone_number : "0000000000"} </p>
                    </Col>
                  </Row>
                  <hr />
                  {orders.details.orders ?
                    <div>
                      <h4 style={{ textAlign: "center" }}><u>Product Details</u></h4>
                      <Row>
                        <Table
                          className="utils__scrollTable"
                          scroll={{ x: '100%' }}
                          columns={columns1}
                          dataSource={orders.details.orders.data}
                          rowKey={record1 => record1.id}
                          pagination={{ hideOnSinglePage: true }}
                        />
                      </Row>
                    </div> : <Skeleton active />}
                </div>
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Orders
