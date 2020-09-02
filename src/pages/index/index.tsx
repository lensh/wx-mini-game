import React, { useState, useEffect } from 'react'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import './index.less'
import dataList from './data'

export default function Index(): JSX.Element {
  const [curTab, setCurTab] = useState<number>(0)  // 当前是哪个tab
  const [height, setHeight] = useState<number>(0) // 

  const handleTabChange = (tabIndex: number): void => {
    setCurTab(tabIndex)
  }
  const handleSwiperChange = (e): void => {
    setCurTab(e.target.current)
  }

  useEffect(() => {
    const { windowHeight, windowWidth } = Taro.getSystemInfoSync()
    const ratio = windowWidth / 750   // rpx和px的比例
    // setHeight(windowHeight - 80 * ratio)  // windowHeight是可使用高度
    setHeight(windowHeight)  // windowHeight是可使用高度
  }, [])

  return (
    <View className='wrapper'>
      <ScrollView
        scrollX
        scrollWithAnimation
        scrollIntoView={'id' + curTab} // 自动滑动到某个View
        className='scroll-top'
      >
        {
          dataList.map((item, index) => (
            <View
              id={'id' + index}
              className={classNames('top-item', index == curTab ? 'active' : '')}
              key={item.name}
              onClick={handleTabChange.bind(this, index)}
            >{item.name}</View>
          ))
        }
      </ScrollView>
      <View className='swiper-content' style={{ height: `calc(100vh-80rpx)` }}>
        <Swiper
          className='swiper'
          current={curTab}
          duration={300}
          onChange={handleSwiperChange}
          style='height:100%'
        >
          {
            dataList.map(item => (
              <SwiperItem className='swiper-item' key={item.name}>
                <ScrollView scrollY style='height:100%;'>
                  {item.list}{item.list}{item.list}{item.list}{item.list}{item.list}{item.list}{item.list}{item.list}{item.list}{item.list}
                </ScrollView>
              </SwiperItem>
            ))
          }
        </Swiper >
      </View>
    </View >
  )
} 