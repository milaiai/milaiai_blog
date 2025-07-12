---
author: "Yubao"
title: "Use Open CV in Android Studio"
image: "img/cover.jpg"
draft: true
date: 2023-11-28
description: "OpenCV for Android Studio"
tags: ["android", "opencv"]
archives: ["2023/12"]
---

# Environment

- Android Studio: 2022.3.1 patch 1
-
-
# Import Opencv
- Create Android project 
    - Java
    - API: 29
    - Groovy DSL
    - JDK: 18
    - Gradle plugin version: 8.1.1
    - Gradel version: 8.0
- New -> import Module
    - OpenCV-android-sdk-4.8.1/sdk
    - module name: :opencv

- build.gradle for app

```sh
   implementation project(path: ':opencv')

   implementation(project(mapOf("path" to ":opencv")))
```

- build.gradle for project

```sh
plugins {
    id 'com.android.application' version '8.1.1' apply false
    id 'com.android.library' version '8.1.1' apply false // 追加
    id 'org.jetbrains.kotlin.android' version "1.8.10" apply false
}
```

- For build.gradle.kts

```sh
id("com.android.application") version "8.1.1" apply false
id("com.android.library") version "8.1.1" apply false // 追加
id("org.jetbrains.kotlin.android") version "1.8.10" apply false
```
- OpenCV build.gradle

```sh
  namespace 'org.opencv'

buildFeatures{
    aidl true
    buildConfig true
}
```

# Test OpenCV

````java

static {
        System.loadLibrary("opencv_java4");
    }

Log.d("openCV", OpenCVLoader.OPENCV_VERSION);
````

# Errors

- opencv:compileDebugKotlin
```sh
Execution failed for task ':opencv:compileDebugKotlin'.
> 'compileDebugJavaWithJavac' task (current target is 1.8) and 'compileDebugKotlin' task (current target is 17) jvm target compatibility should be set to the same Java version.
  Consider using JVM toolchain: https://kotl.in/gradle/jvm/toolchain
```

Solution: check the JDK version in gradle settings

```sh
compileOptions {
    sourceCompatibility = JavaVersion.VERSION_18
    targetCompatibility = JavaVersion.VERSION_18
}
```

- com.android.application
```sh

Plugin [id: 'com.android.application', version: '8.1.1', apply: false] was not found in any of the following sources:
```

Solution:

make settings.gradle and settings.gradle.kts same

# References

- [OpenCV + AndroidStudio + Kotlin](https://zenn.dev/301/articles/dbe0773b5c8b3f)

