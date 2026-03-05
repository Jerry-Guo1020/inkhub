#ifndef WIFI_HANDER_H
#define WIFI_HANDER_H

#include <Arduino.h>

// 连接WiFi的初始化函数
void setupWIFI(const char* ssid, const char* password);

// 同步时间
void setupTime();

// 获取到时间优化时间格式
String getCurrentTime();

#endif