import React from 'react';
import { Button } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType, ISearchData } from './model';

import SearchForm from '@/components/SearchForm';
import useConnectTable from '@/components/SearchForm/useConnectTable';
import StandardTable from '@/components/StandardTable';
import { searchSchema } from './schema';

import styles from './style.less';

const ACTIONS = {
  FETCH_LIST: 'BLOCK_NAME/fetchList',
};

interface IProps {
  dispatch: Dispatch<any>;
  dataScouce: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 130,
  },

  { title: '创建时间', dataIndex: 'creationTime', width: 170 },
];

const BLOCK_NAME: React.FC<IProps> = ({ dataScouce, loading, dispatch, searchData }) => {
  const onFetch = (data: {}) => {
    return dispatch({ type: ACTIONS.FETCH_LIST, payload: data });
  };

  const { pagination } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
  });

  return (
    <PageHeaderWrapper className={styles.textOrder}>
      <StandardTable
        actions={
          <Button.Group size="small">
            <Button type="primary">新增</Button>
          </Button.Group>
        }
        searchContent={
          <SearchForm onSearch={vals => console.log(vals)} formSchema={searchSchema} />
        }
        columns={columns}
        dataSource={dataScouce}
        loading={loading}
        pagination={pagination}
      />
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    testOrder,
    loading,
  }: {
    testOrder: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => {
    return {
      dataScouce: testOrder.list,
      searchData: testOrder.searchData,
      loading: loading.effects[ACTIONS.FETCH_LIST],
    };
  },
)(BLOCK_NAME);
