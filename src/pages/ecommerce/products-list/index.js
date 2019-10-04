/* eslint-disable */
import React from 'react'
import { Table, Button, Skeleton } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import table from './data.json'
// import styles from './style.module.scss'

@connect(({ products }) => ({ products }))
class ProductsList extends React.Component {
  // state = {
  //   click: false,
  //   product: null
  // }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'products/GET_LIST'
    })
  }

  handleview = (id) => {
    // const { language, currentPage } = this.state
    const { history } = this.props
    let product = null
    const { products } = this.props
    products.products.data.map((item) => {
      if (item.id === id) {
        product = item
      }
      return null
    })
    history.push({
      pathname: '/ecommerce/product-details',
      state: { product },
    })
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }
  // componentDidMount() {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'products/GET_LIST'
  //   })
  // }

  // onSearch = () => {
  //   const { searchText, tableData } = this.state
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

  // linkSearchInput = node => {
  //   this.searchInput = node
  // }

  render() {
    // const { click, product } = this.state
    const { products } = this.props

    // console.log(click, product)

    const columns = [
      // {
      //   title: 'Product ID',
      //   dataIndex: 'id',
      //   key: 'id',
      //   render: text => (
      //     <a className="utils__link--underlined" href="javascript: void(0);">
      //       {`#${text}`}
      //     </a>
      //   ),
      //   sorter: (a, b) => a.id - b.id,
      // },
      // {
      //   title: 'Thumbnail',
      //   dataIndex: 'thumbnail',
      //   key: 'thumbnail',
      //   render: text => (
      //     <a href="javascript: void(0);" className={styles.thumbnail}>
      //       <img src={text} alt="" />
      //     </a>
      //   ),
      // },
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        // sorter: (a, b) => a.name.length - b.name.length,
        render: text => {
          let resultArray = text.split(" ");
          if (resultArray.length > 7) {
            resultArray = resultArray.slice(0, 7);
            text = resultArray.join(" ") + "...";
          }
          return (
            <p>
              {text}
            </p>
          )
        },
        // filterDropdown: (
        //   <div className="custom-filter-dropdown">
        //     <Input
        //       ref={this.linkSearchInput}
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
        title: 'Mend SKU',
        dataIndex: 'sku',
        key: 'sku',
        // width: 100,
        render: text => (
          <p>
            {text ? `${text}` : 'NA'}
          </p>
        ),
      },
      {
        title: 'Type',
        dataIndex: 'type1',
        key: 'type',
        // width: 100,
        render: text => (
          <p>
            {text ? `${text}` : 'NA'}
          </p>
        ),
      },
      // {
      //   title: 'Attribute Set',
      //   dataIndex: 'attribute',
      //   key: 'attribute',
      //   sorter: (a, b) => a.attribute.length - b.attribute.length,
      // },
      // {
      //   title: 'SKU',
      //   dataIndex: 'sku',
      //   key: 'sku',
      //   sorter: (a, b) => a.sku.length - b.sku.length,
      // },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'shipstatus',
        // width: 100,
        render: (text) => (
          <p
            className={
              text === "live"
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {text}
          </p>
        ),
        filters: [
          {
            text: 'Live',
            value: 'live',
          },
          {
            text: 'Draft',
            value: 'draft',
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.status.indexOf(value) === 0,
      },
      {
        title: 'Price',
        dataIndex: 'meta.display_price.without_tax.formatted',
        key: 'price',
        render: text => <span>{text ? `${text}` : 'NA'}</span>,
        // sorter: (a, b) => a.meta.display_price.without_tax.formatted - b.meta.display_price.without_tax.formatted,
      },
      {
        title: 'Quantity',
        dataIndex: 'meta.stock.level',
        key: 'quantity',
        sorter: (a, b) => a.meta.stock.level - b.meta.stock.level,
      },
      {
        title: 'Availability',
        dataIndex: 'meta.stock.availability',
        key: 'availability',
        // width: 100,
        render: (text) => (
          <p
            className={
              text === "out-stock"
                ? 'font-size-12 badge badge-default'
                : 'font-size-12 badge badge-primary'
            }
          >
            {text}
          </p>
        ),
        filters: [
          {
            text: 'Out of Stock',
            value: 'out-stock',
          },
          {
            text: 'In Stock',
            value: 'in-stock',
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.meta.stock.availability.indexOf(value) === 0,
      },
      // {
      //   title: 'Status',
      //   dataIndex: 'status',
      //   key: 'status',
      //   sorter: (a, b) => a.status.length - b.status.length,
      //   render: record => <span className="font-size-12 badge badge-success">{record}</span>,
      // },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <span>
            {/* <Link
              to={{
                pathname: '/ecommerce/product-details',
                state: { product },
              }}
            > */}
            <Button icon="edit" className="mr-1" size="small" onClick={() => this.handleview(record.id)}>
              View
            </Button>
            {/* </Link> */}
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="All Products" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>All Products</strong>
            </div>
          </div>
          <div className="card-body">
            {products.products.data ?
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={products.products.data}
                rowKey={record => record.id}
              /> : <Skeleton active />}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductsList
