import React, { useState, useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Map } from '@tarojs/components'
import { request } from '@/base/util'
import './index.less'

interface Location {
  longitude: number,
  latitude: number
}

interface MarkersInfo {
  hasMarkers: Boolean
  markers: Array<any>
}

const KEY = 'LTDBZ-YI3K6-6L7SX-MCPFU-XO7OV-EOBMU'

export default function Place(): JSX.Element {
  const [curLocation, setCurlocation] = useState<Location>({ longitude: 0, latitude: 0 })
  const [markersInfo, setMarkersInfo] = useState<MarkersInfo>({ hasMarkers: false, markers: [] })


  useEffect((): void => {
    getLocation()
  }, [])

  useEffect(() => {
    // 根据关键词搜索地方
    const getPlacesByKeyWord = async (keyword: string): Promise<any> => {
      const { status = 0, data = [] } = await request({
        url: 'https://apis.map.qq.com/ws/place/v1/search',
        keyword: encodeURI(keyword),
        boundary: 'region(深圳,0)',
        page_size: 20,
        page_index: 1,
        orderby: '_distance',
        key: KEY
      })
      if (status === 0) {
        const markerArr = data.map((item, index) => ({
          longitude: item.location.lng,
          latitude: item.location.lat,
          title: item.title,
          iconPath: '',
          id: index + 1,
          width: 20,
          height: 30,
          callout: {
            content: item.title,
            display: 'BYCLICK',
            textAlign: 'center',
            padding: 10,
            borderRadius: 8
          }
        }))
        markerArr.push({
          longitude: curLocation.longitude,
          latitude: curLocation.latitude,
          title: '您的位置',
          iconPath: '',
          id: 0,
          width: 20,
          height: 30,
          callout: {
            content: '您的位置',
            display: 'BYCLICK',
            textAlign: 'center',
            padding: 10,
            borderRadius: 8
          }
        })
        setMarkersInfo({ hasMarkers: true, markers: markerArr })
      }
    }
    curLocation.longitude && getPlacesByKeyWord('餐厅')
  }, [curLocation])

  // 获取位置
  const getLocation = (): void => {
    Taro.getLocation({
      type: 'gcj02',
      success: function (res) {
        const { longitude, latitude } = res
        setCurlocation({ longitude, latitude })
      }
    })
  }
  const handleMarkerTap = (e): void => {
    const { markerId } = e.detail
    const curMarker = markersInfo.markers.find(t => t.id == markerId)
    const { longitude, latitude } = curMarker
    setCurlocation({ longitude, latitude })
  }
  return (
    <View className='wrapper' style='height:100%'>
      <View style='height:500rpx'>
        {
          markersInfo.hasMarkers ? (
            <Map
              longitude={curLocation.longitude}
              latitude={curLocation.latitude}
              markers={markersInfo.markers}
              scale={12}
              circles={[]}
              polyline={[]}
              style='width:100%;height:100%'
              onMarkerTap={handleMarkerTap}
            ></Map>
          ) : null
        }
      </View>
    </View>
  )
}