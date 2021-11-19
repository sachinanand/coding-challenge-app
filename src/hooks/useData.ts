import { useEffect, useCallback, useRef, useReducer } from 'react'
import { http } from '../core'
import _ from 'lodash'
export interface DataOptions {
  paged?: boolean
  infinite?: boolean
  onLoad?: (data: any) => any
}

export function usePagedData(
  url: string | null | undefined,
  options: DataOptions = {}
) {
  return useData(url, { ...options, paged: true })
}

export interface DataLoaderState {
  next?: string
  data?: any
  size: number
  count: number
  error?: any
  loading: boolean
  refreshing: boolean
  ready: boolean
  isZeroState: boolean
  isFiltered: boolean
  isEmpty: boolean
  filters?: { [key: string]: any }
  search?: string
}

export interface DataLoaderAction {
  type: string
  value: any
}

function reducer(state: DataLoaderState, action: DataLoaderAction) {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.value }
    case 'next':
      return {
        ...state,
        data: [...state.data, ...action.value.results],
        next: action.value.next,
        count: action.value.count,
      }
    case 'replace':
      const updated = [...(state.data ?? [])]
      const index = updated.findIndex((it: any) => it.id === action.value?.id)

      if (index > -1) {
        updated.splice(index, 1, { ...updated[index], ...action.value })
      }

      return { ...state, data: updated }
    case 'remove':
      let { data = [] } = state

      if (action.value?.id) {
        _.remove(data, (it: any) => it.id === action.value?.id)
      }

      return {
        ...state,
        isEmpty: !data?.length,
        isZeroState: !data?.length && !state.isFiltered,
        data: [...data],
      }
    case 'prepend':
      return {
        ...state,
        isZeroState: !action.value?.length,
        isEmpty: !action.value?.length,
        data: [...action.value, ...(state.data || [])],
      }
    case 'append':
      return {
        ...state,
        isZeroState: !action.value?.length,
        isEmpty: !action.value?.length,
        data: [...(state.data || []), ...action.value],
      }
    case 'order':
      let fields, order
      if (Array.isArray(action.value[1])) {
        fields = action.value[0]
        order = action.value[1]
      } else {
        fields = action.value
      }

      return {
        ...state,
        data: _.orderBy(state.data, fields, order),
      }
  }
}

const initialState = {
  size: 0,
  loading: false,
  refreshing: false,
  ready: false,
  isFiltered: false,
  isZeroState: false,
} as DataLoaderState
export function useData(
  url: string | undefined | null,
  options: DataOptions = {}
) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const isCancelled = useRef<any>(false)

  const load = useCallback(
    async (refreshing?: boolean) => {
      try {
        if (!url) {
          dispatch({
            type: 'set',
            value: {
              ...initialState,
              ready: true,
              loading: false,
            },
          })
          return
        }

        if (!refreshing) {
          dispatch({ type: 'set', value: { loading: true } })
        }

        const { data } = await http.request({
          method: 'GET',
          url,
        })

        if (isCancelled.current) {
          return
        }

        const isFiltered =
          !!url.match(/filters=|search=/i) && !url.match(/!d=$/i)
        const isEmpty = options.paged ? data.count === 0 : !data

        const value = {
          data: options.paged ? data.results : data,
          next: options.paged ? data.next : null,
          count: options.paged ? data.count : 0,
          size: options.paged ? data.size : 0,
          filters: options.paged ? data.filters : null,
          search: options.paged ? data.search : null,
          error: null,
          loading: false,
          refreshing: false,
          ready: true,
          isFiltered,
          isEmpty,
          isZeroState: !isFiltered && isEmpty,
        }

        dispatch({
          type: 'set',
          value,
        })
      } catch (error) {
        dispatch({
          type: 'set',
          value: {
            error,
            loading: false,
            refreshing: false,
            ready: true,
          },
        })
      }
    },
    [url, options.paged, options.infinite]
  )

  useEffect(() => {
    options.onLoad?.(state.data)
  }, [state.data, options.onLoad])

  const loadNext = useCallback(async () => {
    if (!state.next) {
      return
    }

    const { data } = await http.request({
      method: 'GET',
      url: state.next,
    })

    dispatch({
      type: 'next',
      value: data,
    })
  }, [state.next])

  const refresh = useCallback(async () => {
    dispatch({
      type: 'set',
      value: {
        refreshing: true,
      },
    })

    await load(true)
  }, [load])

  useEffect(() => {
    isCancelled.current = false
    load()
    return () => {
      isCancelled.current = true
    }
  }, [load])

  const updateData = (data: any, prepend?: boolean) => {
    if (options.paged) {
      const d = Array.isArray(data) ? data : [data]
      dispatch({
        type: prepend ? 'prepend' : 'append',
        value: d,
      })
    } else {
      dispatch({ type: 'set', value: { data } })
    }
  }

  const replaceData = (data: any) => {
    if (options.paged) {
      dispatch({
        type: 'replace',
        value: data,
      })
    }
  }

  const removeData = (data: any) => {
    if (options.paged) {
      dispatch({
        type: 'remove',
        value: data,
      })
    }
  }

  const orderData = (by: any) => {
    if (options.paged) {
      dispatch({
        type: 'order',
        value: by,
      })
    }
  }

  return {
    ...state,
    refresh,
    loadNext,
    updateData,
    replaceData,
    orderData,
    removeData,
    hasNext: !!state.next,
  }
}
