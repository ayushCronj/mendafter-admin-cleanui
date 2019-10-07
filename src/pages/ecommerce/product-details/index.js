/* eslint-disable */
import React from 'react'
import { Carousel, Breadcrumb, Rate, Select, Tooltip, Button, Icon, Tabs, Descriptions, Row, Col, Skeleton, Input, InputNumber } from 'antd'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'
import data from './data.json'
// import ProductsCatalog from '../products-catalog'
import { connect } from 'react-redux'
import './custom.scss'

const { TabPane } = Tabs
const { Option } = Select

@connect(({ products }) => ({ products }))
class ProductDetails extends React.Component {
  nameinput = React.createRef();
  prodidinput = React.createRef();
  prodnameinput = React.createRef();
  prodpriceinput = React.createRef();
  prodskuinput = React.createRef();
  fulfilinput = React.createRef();
  typeinput = React.createRef();
  sluginput = React.createRef();
  statusinput = React.createRef();
  state = {
    edit: false,
    editdetail: false,
    arr: [],
    arrDetail: [],
    imgActiveStatus: [],
    images: data.images,
    sku: data.sku,
    name: data.name,
    rate: data.rate,
    price: data.price,
    oldPrice: data.oldPrice,
    shortDescr: data.shortDescr,
    description: data.description,
    properties: data.properties,
  }

  componentWillMount() {
    const { location, history, dispatch } = this.props
    const { state } = location

    if (state !== undefined) {
      dispatch({
        type: 'products/GET_VENDOR_NAME',
        payload: state.product.vendorId
      })
      this.setState({
        product: state.product
      })
    }
    else {
      history.push({
        pathname: '/ecommerce/products-list'
      })
    }
    this.generateImgStatus()
  }

  generateImgStatus = () => {
    const { imgActiveStatus, images } = this.state
    images.forEach((img, index) => {
      imgActiveStatus[index] = 'not-active'
      if (index === 0) {
        imgActiveStatus[0] = 'active'
      }
    })
  }

  setActiveImg = imgNumber => {
    const { imgActiveStatus } = this.state
    imgActiveStatus.forEach((imgStatus, index) => {
      imgActiveStatus[index] = 'not-active'
      if (imgNumber === index) {
        imgActiveStatus[index] = 'active'
      }
    })
    this.setState({
      imgActiveStatus,
    })
  }

  refSlider = node => {
    this.slider = node
  }

  changeSlide = (e, index) => {
    e.preventDefault()
    this.slider.slick.innerSlider.slickGoTo(index)
    this.setActiveImg(index)
  }

  handleBack = () => {
    const { history } = this.props;
    history.push({
      pathname: '/ecommerce/products-list'
    })
  }

  editVendor = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  editDetail = () => {
    this.setState({
      editdetail: !this.state.editdetail
    })
  }

  handleEditSubmit = () => {
    const { products } = this.props
    let arr = []
    let obj = {
      vendorName: this.nameinput.current.state.value,
      vendorId: products.vendordetails.vendorId,
      vendorProductName: this.prodnameinput.current.state.value,
      // vendorProductPrice: this.prodpriceinput.current.state.value,
      vendorProductPrice: +parseFloat(this.prodpriceinput.current.inputNumberRef.state.value).toFixed(2),
      vendorProductId: this.prodidinput.current.state.value,
      vendorProductSKU: this.prodskuinput.current.state.value,
      fulfilmentMethod: this.fulfilinput.current.state.value
    }
    arr.push(obj)
    console.log(arr)
    this.setState({
      edit: false,
      arr
    })
  }

  editDetailSubmit = () => {
    const { products } = this.props
    // const { prouct } = this.state
    let arrDetail = []
    let obj = {
      vendorId: products.vendordetails.vendorId,
      commodity_type: this.typeinput.current.state.value,
      slug: this.sluginput.current.state.value,
      status: this.statusinput.current.state.value
    }
    arrDetail.push(obj)
    console.log(arrDetail)
    this.setState({
      editdetail: false,
      arrDetail
    })
  }

  render() {
    const {
      imgActiveStatus,
      images,
      sku,
      name,
      rate,
      price,
      oldPrice,
      shortDescr,
      description,
      properties,
      product
    } = this.state
    // let product = {}

    // console.log(product)
    const { products } = this.props
    // console.log(this.state)

    return (
      <div>
        <Helmet title="Products Details" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Product Details</strong> &nbsp;&nbsp;
              <Button className="button" onClick={this.handleBack}><Icon type="left" />Go Back</Button>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                {/* <div> Photo Section </div> */}
                <div className={styles.item}>
                  <div className={styles.img}>
                    <div className={styles.status}>
                      <span className={styles.statusTitle}>{product && this.state.arrDetail.length > 0 ? this.state.arrDetail[0].status : product && product.status ? product.status : "NA"}</span>
                    </div>
                    {/* <div className={`${styles.like} ${styles.selectedLike}`}>
                      <i className="icmn-heart" />
                    </div> */}
                    {/* <Carousel ref={this.refSlider} autoplay={false} dots={false} effect="fade"> */}
                    {/* {images.map(image => (
                      <div key={image}>
                        <img className={styles.img} src={image} alt="" />
                      </div>
                    ))} */}
                    <img className={styles.img} src="https://place-hold.it/100x100" alt="" />
                    {/* </Carousel> */}
                  </div>
                </div>
                {/* <div className={`${styles.photos} clearfix`}>
                  {images.map((image, index) => (
                    <a
                      href="javascript: void(0)"
                      key={image}
                      onClick={e => {
                        this.changeSlide(e, index)
                      }}
                      className={`${styles.photosItem} ${
                        imgActiveStatus[index] === 'active' ? styles.photosItemActive : ''
                        }`}
                    >
                      <img src={image} alt="" />
                    </a>
                  ))}
                </div> */}
              </div>
              <div className="col-lg-8">
                {/* <div className={styles.breadcrumbs}>
                  <Breadcrumb separator="">
                    <Breadcrumb.Item>
                      <span className={styles.breadcrumbItem}>
                        <a href="javascript: void(0);">Catalog</a>
                      </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <span className={styles.breadcrumbItem}>
                        <a href="javascript: vcommodity_typeoid(0);">Chairs</a>
                      </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <span className={styles.breadcrumbItem}>
                        <a href="javascript: void(0);">White</a>
                      </span>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div> */}
                <div className={styles.sku}>
                  {`Mend SKU: ${product && product.sku ? product.sku : 'NA'}`}
                  <br />
                  {/* <div className={styles.raiting}>
                    <Rate value={rate} disabled allowHalf />
                  </div> */}
                </div>
                <h4 className={styles.mainTitle}>
                  <strong>{product && product.name ? product.name : 'NA'}</strong>
                </h4>
                <div className={styles.price}>
                  {`${product && product.meta.display_price ? product.meta.display_price.without_tax.formatted : "NA"}`}
                  {/* {oldPrice && <div className={styles.priceBefore}>{`$${oldPrice}`}</div>} */}
                </div>
                <hr />
                <div className={`mb-1 ${styles.descr}`}>
                  <p>{product && product.description ? product.description : "NA"}</p>
                </div>
                <br />
                <br />
                <div className="row">
                  {product && product.meta && product.meta.variations ?
                    <div className="row" style={{ marginLeft: "-0.16rem" }}>
                      {/* <div className="row"> */}
                      {/* <div className={styles.optionTitle}>Variations</div> */}
                      {product.meta.variations.map((item => {
                        return (
                          // <div key={item.id} className="col-lg-6">
                          <div className="col-lg-6" key={item.id}>
                            <div className={styles.optionTitle}>{item.name}</div>
                            <div className={styles.option}>
                              <Select defaultValue="NA" size="small" style={{ width: 120 }}>
                                {item.options.map((option) => {
                                  return (
                                    <Option key={option.id} value="NA">{option.name}</Option>
                                  )
                                })}
                              </Select>
                            </div>
                          </div>
                          // </Col>
                        )
                      }))}
                      {/* </div> */}
                    </div>
                    :
                    <div className="col-lg-6">
                      <div className={styles.optionTitle}>No Variations Available</div>
                    </div>
                  }
                  {/* <div className={styles.option}>
                      <Select defaultValue="Red" size="small" style={{ width: 120 }}>
                        <Option value="red">Red</Option>
                        <Option value="black">Black</Option>
                        <Option value="cyan">Cyan</Option>
                        <Option value="blue">Blue</Option>
                      </Select>
                    </div> */}
                  {/* <div className={styles.optionTitle}>Available Size</div>
                    <div className={styles.option}>
                      <div className={styles.sizes}>
                        <Tooltip placement="top" title="Size S">
                          <span>S</span>
                        </Tooltip>
                        <Tooltip placement="top" title="Size M">
                          <span title="Size M">M</span>
                        </Tooltip>
                        <Tooltip placement="top" title="Size XL">
                          <span>XL</span>
                        </Tooltip>
                      </div>
                    </div> */}
                </div>
                {/* </div> */}
                <hr />
                {/* <div className={styles.controls}>
                  <Button type="primary" size="large">
                    <Icon type="shopping-cart" />
                    Buy now
                  </Button>
                  <a href="javascript: void(0);" className="btn btn-link">
                    <i className="icmn-heart mr-1" />
                    Add to Wishlist
                  </a>
                  <a href="javascript: void(0);" className="btn btn-link">
                    <i className="icmn-stats-bars mr-1" />
                    Add to Compare
                  </a>
                </div> */}
                <div className={styles.info}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Product Information" key="1"> <Icon style={{ float: 'right', fontSize: "20px", paddingRight: "2%", paddingBottom: "1%" }} onClick={this.editDetail} type={this.state.editDetail ? "close" : "edit"} />
                      {!this.state.editdetail ?
                        <Descriptions bordered>
                          <Descriptions.Item label="Commodity Type" span={2}> {product && this.state.arrDetail.length > 0 ? this.state.arrDetail[0].commodity_type : product && product.commodity_type ? product.commodity_type : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Slug" span={1}> {product && this.state.arrDetail.length > 0 ? this.state.arrDetail[0].slug : product && product.slug ? product.slug : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Status" span={2}> {product && this.state.arrDetail.length > 0 ? this.state.arrDetail[0].status : product && product.status ? product.status : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Product Added On" span={1}> {product && product.meta.timestamps && product.meta.timestamps.created_at ? JSON.stringify(new Date(product.meta.timestamps.created_at)).slice(1, 11) : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Stock Availability" span={2}> {product && product.meta.stock.availability ? product.meta.stock.availability : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Stock Level" span={1}> {product && product.meta.stock.level ? product.meta.stock.level : "0"} </Descriptions.Item>
                        </Descriptions> :
                        <Descriptions bordered>
                          <Descriptions.Item label="Commodity Type" span={2}> <Input ref={this.typeinput} defaultValue={product && this.state.arrDetail.length > 0 ? this.state.arrDetail[0].commodity_type : product && product.commodity_type ? product.commodity_type : "NA"} /> </Descriptions.Item>
                          <Descriptions.Item label="Slug" span={1}> <Input ref={this.sluginput} defaultValue={product && this.state.arrDetail.length > 0 ? this.state.arrDetail[0].slug : product && product.slug ? product.slug : "NA"} /></Descriptions.Item>
                          <Descriptions.Item label="Status" span={2}> <Input ref={this.statusinput} defaultValue={product && this.state.arrDetail.length > 0 ? this.state.arrDetail[0].status : product && product.status ? product.status : "NA"} /></Descriptions.Item>
                          <Descriptions.Item label="Product Added On" span={1}> <Input defaultValue={product && product.meta.timestamps && product.meta.timestamps.created_at ? JSON.stringify(new Date(product.meta.timestamps.created_at)).slice(1, 11) : "NA"} disabled /> </Descriptions.Item>
                          <Descriptions.Item label="Stock Availability" span={2}> <Input disabled defaultValue={product && product.meta.stock.availability ? product.meta.stock.availability : "NA"} /></Descriptions.Item>
                          <Descriptions.Item label="Stock Level" span={1}> <Input disabled defaultValue={product && product.meta.stock.level ? product.meta.stock.level : "0"} /></Descriptions.Item>
                          <Descriptions.Item className="desitem" span={3}> <Button className="button" type="primary" onClick={this.editDetailSubmit}> Edit </Button> </Descriptions.Item>
                        </Descriptions>}
                    </TabPane>
                    <TabPane tab="Vendor Information" key="2"> <Icon style={{ float: 'right', fontSize: "20px", paddingRight: "2%", paddingBottom: "1%" }} onClick={this.editVendor} type={this.state.edit ? "close" : "edit"} />
                      {!this.state.edit ? product && products && products.vendordetails && products.vendordetails.vendorId === product.vendorId ?
                        <Descriptions bordered>
                          <Descriptions.Item label="Vendor Name" span={2}> {product && products && this.state.arr.length > 0 && this.state.arr[0].vendorName ? this.state.arr[0].vendorName : products.vendordetails ? products.vendordetails.vendorName : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Vendor Product ID" span={1}> {product && this.state.arr.length > 0 && this.state.arr[0].vendorProductId ? this.state.arr[0].vendorProductId : product && product.vendorProductId ? product.vendorProductId : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Vendor Product Name" span={2}> {product && this.state.arr.length > 0 && this.state.arr[0].vendorProductName ? this.state.arr[0].vendorProductName : product && product.vendorProductName ? product.vendorProductName : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Vendor Product Price" span={1}> {product && this.state.arr.length > 0 && this.state.arr[0].vendorProductPrice ? this.state.arr[0].vendorProductPrice : product && product.vendorProductPrice ? product.vendorProductPrice : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Vendor Product SKU" span={2}> {product && this.state.arr.length > 0 && this.state.arr[0].vendorProductSKU ? this.state.arr[0].vendorProductSKU : product && product.vendorProductSKU ? product.vendorProductSKU : "NA"} </Descriptions.Item>
                          <Descriptions.Item label="Vendor Fulfilment Method" span={1}> {product && products && this.state.arr.length > 0 && this.state.arr[0].fulfilmentMethod ? this.state.arr[0].fulfilmentMethod : products.vendordetails ? products.vendordetails.fulfilmentMethod : "NA"} </Descriptions.Item>
                        </Descriptions> : <Skeleton active />
                        :
                        <Descriptions bordered>
                          <Descriptions.Item label="Vendor Name" span={2}><Input ref={this.nameinput} defaultValue={product && products && this.state.arr.length > 0 && this.state.arr[0].vendorName ? this.state.arr[0].vendorName : products.vendordetails ? products.vendordetails.vendorName : "NA"} /></Descriptions.Item>
                          <Descriptions.Item label="Vendor Product ID" span={1}><Input ref={this.prodidinput} defaultValue={product && this.state.arr.length > 0 && this.state.arr[0].vendorProductId ? this.state.arr[0].vendorProductId : product && product.vendorProductId ? product.vendorProductId : "NA"} /></Descriptions.Item>
                          <Descriptions.Item label="Vendor Product Name" span={2}><Input ref={this.prodnameinput} defaultValue={product && this.state.arr.length > 0 && this.state.arr[0].vendorProductName ? this.state.arr[0].vendorProductName : product && product.vendorProductName ? product.vendorProductName : "NA"} /></Descriptions.Item>
                          <Descriptions.Item label="Vendor Product Price" span={1}>
                            <InputNumber min={0} defaultValue={product && this.state.arr.length > 0 && this.state.arr[0].vendorProductPrice ? this.state.arr[0].vendorProductPrice : product && product.vendorProductPrice ? product.vendorProductPrice : "0.00"} step={0.01} ref={this.prodpriceinput} />
                            {/* <Input ref={this.prodpriceinput} defaultValue={product && this.state.arr.length > 0 && this.state.arr[0].vendorProductPrice ? this.state.arr[0].vendorProductPrice : product && product.vendorProductPrice ? product.vendorProductPrice : "NA"} /> */}
                          </Descriptions.Item>
                          <Descriptions.Item label="Vendor Product SKU" span={2}><Input ref={this.prodskuinput} defaultValue={product && this.state.arr.length > 0 && this.state.arr[0].vendorProductSKU ? this.state.arr[0].vendorProductSKU : product && product.vendorProductSKU ? product.vendorProductSKU : "NA"} /></Descriptions.Item>
                          <Descriptions.Item label="Vendor Fulfilment Method" span={1}><Input ref={this.fulfilinput} defaultValue={product && products && this.state.arr.length > 0 && this.state.arr[0].fulfilmentMethod ? this.state.arr[0].fulfilmentMethod : products.vendordetails ? products.vendordetails.fulfilmentMethod : "NA"} /></Descriptions.Item>
                          <Descriptions.Item className="desitem" span={3}> <Button className="button" type="primary" onClick={this.handleEditSubmit}> Edit </Button> </Descriptions.Item>
                        </Descriptions>
                      }
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
    )
  }
}

export default ProductDetails
