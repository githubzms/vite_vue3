<template>
    <div>
        <div id="container">123123</div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from 'axios'
import icon from '../assets/vue.svg'
onMounted(() => {
    mapInit()
})
const mapInit = async () => {
    const result = new AMap.plugin('AMap.Geolocation', res => {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        // AMap.event.addListener(geolocation, 'complete', onComplete)
        // AMap.event.addListener(geolocation, 'error', onError)

        function onComplete(data) {
            // data是具体的定位信息
        }

        function onError(data) {
            // 定位出错
        }
    })
    console.log(result);

    let cDom = document.querySelector('#container')
    let res = await axios.get('/api/search', {
        params: {
            longitude: 114.070189,
            latitude: 22.541785,
            radius: 0.5
        }
    })
    if (!res) return
    console.log(res);
    const data = res.data
    var map = new AMap.Map(cDom, {
        resizeEnable: true,
        zoom: 6,
        center: [114.070189, 22.541785]
    });
    data.forEach(item => {
        var marker = new AMap.Marker({
            icon: icon,
            position: [item.longitude, item.latitude],
            anchor: 'bottom-center'
        });
        map.add(marker);
    })


    var circle = new AMap.Circle({
        center: new AMap.LngLat(114.070189, 22.541785), // 圆心位置
        radius: 50,
        strokeColor: "#F33",  //线颜色
        strokeOpacity: 1,  //线透明度
        strokeWeight: 2,  //线粗细度
        fillColor: "#ee2200",  //填充颜色
        fillOpacity: 0.35 //填充透明度
    });


    map.add(circle);

    map.setFitView();
}
</script>

<style lang='less' scoped>
#container {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    border-radius: 15px;
}
</style>