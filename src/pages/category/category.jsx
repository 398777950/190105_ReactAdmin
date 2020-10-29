import React, { Component } from 'react';
import { Button, Card, message, Table, Modal } from 'antd';
import {
  PlusOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import {reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api/index'

import AddForm from './add-form'
import UpdateForm from './update-form'

class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],      //一级分类
      subCategorys: [],   //二级分类
      loading: false,
      parentId: '0',      //当前一级分类ID
      parentName: '',     //当前一级分类名称
      showStatus: 0,      //标识添加/更新的确认框是否显示，0都不显示，1显示添加，2显示更新
      categoryson: '',
      categoryName:'',
      categoryId:''
    };
  }


  initColums = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        align: 'center',
        width: '60%'
      },
      {
        title: '操作',
        align: 'center',
        width: '40%',
        render: (category) => (
          <span>
            <Button onClick={() => this.showUpdata(category)} style={{ margin: '0px 20px 0px 0px' }} type="danger">修改分类</Button>

            {/* 向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传递数据 */}

            {this.state.parentId === '0' ? <Button type="primary" onClick={() => this.showSubcategorys(category)}>查看子分类</Button> : null}
          </span>
        )
      },
    ]
  }

  //获取一级分类列表
  getCategorys = async () => {
    const { parentId } = this.state
    this.setState({
      loading: true
    })
    const result = await reqCategorys(parentId)
    const res = result.data
    if(res.status === 0) {
      const categorys = res.data
      if(parentId === '0'){
        this.setState({
          categorys 
        })
      }else{
        this.setState({
          subCategorys :categorys
        })
      }
    }else {
      message.error('获取分类列表失败')
    }
    this.setState({
      loading: false
    })
  }

  //显示二级分类列表
  showSubcategorys = (category) => {
    //更新状态
    this.setState({
      parentId:category._id,
      parentName:category.name
    }, () => { //在状态更新且界面重新render()后执行
      this.getCategorys()
    })
  }

  //返回一级分类
  showCategorys = () => {
    //更新为显示一级列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  //为第一次dender()准备数据
  componentWillMount() {
    this.initColums()
  }

  //执行异步任务：发送异步ajax请求
  componentDidMount() {
    this.getCategorys()
  }

  //关闭对话框
  handleCancel = () => {
    this.setState({
      showStatus: 0,
    });
  }

  //显示添加
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  } 

  //显示更新
  showUpdata = (category) => {
    //更新状态
    this.setState({
      showStatus: 2,
      //保存分类对象
      categoryson : category.name,
      categoryId : category._id
    })
  }

  //添加分类
  addCategory = () => {
    console.log('12')
    this.setState({
      showStatus: 0
    })
  }

  getChildValue(e) {
    this.setState({
      categoryName: e.target.value
    })
}

  //更新分类
  updateCategory = async () => {
    this.setState({
      showStatus: 0
    })
    const categoryId = this.state.categoryId
    const categoryName = this.state.categoryName
    //发起请求更新
    const result = await reqUpdateCategory({categoryId,categoryName})
    if(result.status === 0){
      //重新显示列表
      this.getCategorys()
    }else{

    } 
  } 


  render() {
    const { categorys, loading, subCategorys, parentId, parentName, showStatus, categoryson } = this.state
    
    //读取指定分类
    // const category = this.category

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <Button onClick={this.showCategorys}>一级分类列表</Button>
        <span style={{margin:'0px 20px'}}><ArrowRightOutlined /></span>
        <span>{parentName}</span>
      </span>
    )

    const extra = (
      <Button onClick={this.showAdd} icon={<PlusOutlined />}>添加</Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table bordered rowKey='_id' columns={this.columns} 
            dataSource={parentId === '0' ? categorys : subCategorys}
            loading={loading}
            pagination={{defaultPageSize:7,showQuickJumper:true}}
          />
        </Card>
        
        {/* 添加分类 */}
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm></AddForm>
        </Modal>

        {/* 修改分类 */}
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={categoryson} toFatherValue={this.getChildValue.bind(this)}></UpdateForm>
        </Modal>
      </div>
    );
  }
}

export default category;