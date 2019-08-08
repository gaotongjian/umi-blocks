import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ConnectState } from '@/models/connect.d'
import { BLOCK_NAME_CAMEL_CASEApi } from './service';

export interface ISearchData extends ISearchPageData {
  status?: number;
}

export interface StateType {
  list: any[];
  searchData: ISearchData;
}

// 把接口所有参数变为非必填
export type PartialStateType = Partial<StateType>

// 当前页面可以获取到的model
// 这里只引入了全局的和当前页面级别的model，还没引入一级page目录级别model
export type ConnectPageState = ConnectState & { BLOCK_NAME_CAMEL_CASE: PartialStateType }

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectPageState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: PartialStateType;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    saveList: Reducer<PartialStateType>;
  };
}

const Model: ModelType = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {
    searchData: {},
    list: [],
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const res = yield call(BLOCK_NAME_CAMEL_CASEApi.index, payload);
      yield put({ type: 'saveList', payload: Array.isArray(res.data) ? res.data : [] });
      return res;
    },
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};

export default Model;
