import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { PAGE_NAME_UPPER_CAMEL_CASEApi } from './service';

export interface ISearchData extends ISearchPageData {
  status?: number;
}

export interface StateType {
  list: any[];
  searchData: ISearchData;
}

// 把接口所有参数变为非必填
export type PartialStateType = Partial<StateType>

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: PartialStateType) => T) => T },
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
  namespace: 'PAGE_NAME_UPPER_CAMEL_CASE',

  state: {
    searchData: {},
    list: [],
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const res = yield call(PAGE_NAME_UPPER_CAMEL_CASEApi.index, payload);
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
