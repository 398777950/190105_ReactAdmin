import React, { Component } from 'react';
import { Button, Card, Table, Space } from 'antd';
import {
    PlusOutlined,
  } from '@ant-design/icons';
  import linkButton from '../../components/link-button/index'

class category extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const title = '一级分类列表'

        const extra = (
            <Button icon={<PlusOutlined />}>添加</Button>
        )

        const columns = [
            
            {
              title: '分类名称',
              dataIndex: 'name',
              align: 'center',
              width:'60%'
            },
            {
              title: '操作',
              align: 'center',
              width:'40%',
              render: () => (
                  <span>
                      <Button style={{margin:'0px 20px 0px 0px'}} type="danger">修改分类</Button>
                      <Button type="primary">查看子分类</Button>
                  </span>
              )
            },
          ];
          const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
            },
            {
                title: 'Action',
                key: 'action',
                
              },
          ];

        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table bordered rowKey='_id' columns={columns} dataSource={data}/>
                </Card>
            </div>
        );
    }
}

export default category;