/* eslint-disable */
import React from 'react'
import { Carousel, Breadcrumb, Rate, Select, Tooltip, Button, Icon, Tabs, Descriptions } from 'antd'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'
import data from './data.json'
import ProductsCatalog from '../products-catalog'

const { TabPane } = Tabs
const { Option } = Select

class ProductDetails extends React.Component {
  state = {
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
    const { location, history } = this.props
    const { state } = location
    if (state !== undefined) {
      this.setState({
        product: state.product
      })
    }
    else {
      history.push({
        pathname: '/ecommerce/products-list',
        // state: { product },
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

    // console.log(this.state)

    return (
      <div>
        <Helmet title="Products Details" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Product Details</strong>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                {/* <div> Photo Section </div> */}
                <div className={styles.item}>
                  <div className={styles.img}>
                    {/* <div className={styles.status}>
                      <span className={styles.statusTitle}>New</span>
                    </div> */}
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
                        <a href="javascript: void(0);">Chairs</a>
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
                    <div className="col-lg-6">
                      {/* <div className={styles.optionTitle}>Variations</div> */}
                      {product.meta.variations.map((item => {
                        return (
                          <div key={item.id}>
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
                        )
                      }))}
                    </div> :
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
                    <TabPane tab="Product Information" key="1">
                      {/* {properties.map(property => (
                        <div classNamOther e="mb-1" key={property.name}>
                          <strong className="mr-1">{`${property.name}: `}</strong>
                          {property.value}
                        </div>
                      ))} */}
                      <Descriptions bordered>
                        <Descriptions.Item label="Commodity Type" span={2}> {product && product.commodity_type ? product.commodity_type : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Slug" span={1}> {product && product.slug ? product.slug : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Status" span={2}> {product && product.status ? product.status : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Stock Level" span={1}> {product && product.meta.stock.level ? product.meta.stock.level : "0"} </Descriptions.Item>
                        <Descriptions.Item label="Stock Availability" span={2}> {product && product.meta.stock.availability ? product.meta.stock.availability : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Product Added On" span={1}> {product && product.meta.timestamps && product.meta.timestamps.created_at ? JSON.stringify(new Date(product.meta.timestamps.created_at)).slice(1, 11) : "NA"} </Descriptions.Item>
                      </Descriptions>
                      {/* <div className="mb-1">
                        <strong className="mr-1">{`Commodity Type: `}</strong>
                        {product && product.commodity_type ? product.commodity_type : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Slug: `}</strong>
                        {product && product.slug ? product.slug : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Status: `}</strong>
                        {product && product.status ? product.status : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Stock Level: `}</strong>
                        {product && product.meta.stock.level ? product.meta.stock.level : "0"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Stock Availabililty: `}</strong>
                        {product && product.meta.stock.availability ? product.meta.stock.availability : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Product Added On: `}</strong>
                        {product && product.meta.timestamps && product.meta.timestamps.created_at ? JSON.stringify(new Date(product.meta.timestamps.created_at)).slice(1, 11) : "NA"}
                      </div> */}
                      {/* <div className="mb-1">
                        <strong className="mr-1">{`${property.name}: `}</strong>
                        {property.value}
                      </div> */}
                    </TabPane>
                    <TabPane tab="Vendor Information" key="2">
                      <Descriptions bordered>
                        <Descriptions.Item label="Vendor ID" span={2}> {product && product.vendorId ? product.vendorId : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Vendor Name" span={1}> {product && product.vendorName ? product.vendorName : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Vendor Product ID" span={2}> {product && product.vendorProductId ? product.vendorProductId : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Vendor Product Name" span={1}> {product && product.vendorProductName ? product.vendorProductName : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Vendor Product SKU" span={2}> {product && product.vendorProductSKU ? product.vendorProductSKU : "NA"} </Descriptions.Item>
                        <Descriptions.Item label="Vendor Product Price" span={1}> {product && product.vendorProductPrice ? product.vendorProductPrice : "NA"} </Descriptions.Item>
                      </Descriptions>
                      {/* <div className="mb-1">
                        <strong className="mr-1">{`Vendor ID: `}</strong>
                        {product && product.vendorId ? product.vendorId : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Vendor Product ID: `}</strong>
                        {product && product.vendorProductId ? product.vendorProductId : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Vendor Product Name: `}</strong>
                        {product && product.vendorProductName ? product.vendorProductName : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Vendor Product SKU: `}</strong>
                        {product && product.vendorProductSKU ? product.vendorProductSKU : "NA"}
                      </div>
                      <div className="mb-1">
                        <strong className="mr-1">{`Vendor Product Price `}</strong>
                        {product && product.vendorProductPrice ? product.vendorProductPrice : "NA"}
                      </div> */}
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
