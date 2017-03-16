"use strict";

var bounds = [[81.225, -95.227],[-81.225, 95.227]]; // Определение границ новой карты
var newMap = L.map("map", bounds).setView([0, 0], 2); // Создание слоя для новой карты
var newLayer = L.tileLayer("map/{z}/{x}/{y}.png", {
    minZoom: 2, // максимальное отдаление;
    maxZoom: 5, // максимальное приближение;
    continuousWorld: false, // Отмена повторений карты;
    noWrap: true
}).addTo(newMap); // Создание новой карты
var newIcon = L.icon({
  iconUrl: "styles/images/marker-icon.png",
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
  }); // Определение стиля маркеров

var mapMarkers = angular.module("mapMarkers", ["angularBootstrapNavTree"]);
mapMarkers.controller("NextCtrl", function($scope) {

 $scope.selectedMapData = [{
  label: "Стёртые",
  onSelect: $scope.returnBack,
  children: []
  }]; // Определение массива для стёртых/выбранных маркеров

  var dropMarkerOnMap = function(item){
    if (currentPoint.length == 0) {
      var newMarker = L.marker(item.latLng, {icon: newIcon}).addTo(newMap);
      newMarker._icon.id = item.id;
      newMarker.bindPopup("<p class='popup'><b>" + newMarker._icon.id + ":</b> широта: <span>" + item.latLng[0] + "</span><br>долгота: <span>" + item.latLng[1] + "</span></p>").openPopup();
      newMarker._icon.onmouseover = toReplaceHover; // Определине функции перемещения при НАВЕДЕНИИ курсора
      item.onSelect = dropMarkerOnMap;
      currentPoint.push(newMarker);
    } else {
      clearMap(); // Очистка карты
      dropMarkerOnMap(item);
    }
  }; // Функция выпадения маркеров, поштучно;

  var dropMarkersFromBranch = function(branch, branchFromGodBranch) {
    if (!branchFromGodBranch){ // Условие, если прорисовка маркеров для Божественной/первой ветки;
      clearMap(); // Очистить карту перед заполнением новыми маркерами;
    }
    var thisBranch = branch.children;
    thisBranch.forEach(function(markerPoint, markerIndex){
      var newMarkers = L.marker(thisBranch[markerIndex].latLng, {icon: newIcon}).addTo(newMap);
      newMarkers._icon.id = thisBranch[markerIndex].id;
      newMarkers._icon.onmouseover = toReplaceHover; // Определине функции перемещения при НАВЕДЕНИИ курсора
      currentPoint.push(newMarkers);
    });
  }; // Функция выпадения маркеров, всей выбранной ветки (оставшихся)

  var dropAllMarkers = function(branch) {
    clearMap(); // Очистка карты;
    var godBranch = branch.children;
    godBranch.forEach(function(item, index){
      godBranch[index].onSelect(godBranch[index], true);
    });
  }; // Функция выпадения маркеров, всех (оставшихся)

  $scope.returnBack = function(branch) {
    $scope.selectedMapData[0].children.forEach(function(x, markPos) {
      if (branch.id == $scope.selectedMapData[0].children[markPos].id) {
        branch.onSelect = dropMarkerOnMap;
        branch.selected = false;
        branch.level = 3;
        $scope.mapData[0].children[branch.parentId].children.splice(branch.itemId, 0, branch);
        $scope.selectedMapData[0].children.splice(markPos, 1);
        $scope.$apply();
      }
    });
  }; // Функция возврата стёртых/выбранных маркеров в левый/первый список

  var currentPoint = []; // Глобальная переменная для хранения маркеров находящихся в данный момент на карте

  var clearMap = function(current) {
    if (current != null || current != undefined) {
      newMap.removeLayer(currentPoint[current]);
      currentPoint.splice(current, 1);
    } else {
      currentPoint.forEach(function(itemPoint, indexPoint){
        newMap.removeLayer(currentPoint[indexPoint]);
      });
      currentPoint = [];
    }
  } // Функция очистки карты

  var replaceFunction = function(marker, cpIndex) {
    $scope.mapData[0].children.forEach(function(child, index){
      child.children.forEach(function(itemChild, itemIndex){
       if (marker._icon && (itemChild.id == parseInt(marker._icon.id)) ) {
        itemChild.level = 2;
        itemChild.parentId = index;
        itemChild.onSelect = null;
        $scope.selectedMapData[0].children.push(itemChild);
        clearMap(cpIndex);
        $scope.mapData[0].children[index].selected = false;
        $scope.mapData[0].children[index].children.splice(itemIndex, 1);
        $scope.$apply();
      }
    });
    });// Функция перемещения из левого/первого в правый/второй список;
  };// ("Часть" позволяет использовать функцию при других условиях, например, при клике)

  var toReplaceHover = function(marker) {
    currentPoint.forEach(function(x, cpIndex) {
      if (marker.target.id == currentPoint[cpIndex]._icon.id) {
        replaceFunction(currentPoint[cpIndex], cpIndex);
      }
    });
  } // Функция перемещения при НАВЕДЕНИИ курсора

  $scope.mapData = [{
    label: "Остров Линкольна",
    onSelect: dropAllMarkers, // Закрепление функции выпадения маркеров, всех (оставшихся)
    children: [{
      label: "Северо-Восток",
      onSelect: dropMarkersFromBranch, // Закрепление функции выпадения маркеров, всей выбранной ветки (оставшихся)
      children: [
      {label:"Плато кругозора",
      onSelect: dropMarkerOnMap, // Закрепление функции выпадения маркеров, поштучно (и далее)
      id: 3, latLng: [33, 25.42]},
      {label:"Печь для обжига глиняных изделий",
      onSelect: dropMarkerOnMap, id: 5, latLng: [40.42, -4]},
      {label:"Водопад",
      onSelect: dropMarkerOnMap, id: 6, latLng: [40, 28.42]},
      {label:"Пещера в дюнах",
      onSelect: dropMarkerOnMap, id: 10, latLng: [54, 42.42]},
      {label:"Устричная отмель",
      onSelect: dropMarkerOnMap, id: 11, latLng: [50, 44.42]},
      {label:"Месторождения угля и железа",
      onSelect: dropMarkerOnMap, id: 14, latLng: [46, 6.1]}]
    }, {
      label: "Северо-Запад",
      onSelect: dropMarkersFromBranch, // Закрепление функции выпадения маркеров, всей выбранной ветки (оставшихся)
      children: [
      {label:"Кораль",
      onSelect: dropMarkerOnMap, id: 4, latLng: [40, -10.42]},
      {label:"Пещера Даккара",
      onSelect: dropMarkerOnMap, id: 8, latLng: [43.8, -29.8]}]
    }, {
      label: "Юго-Запад",
      onSelect: dropMarkersFromBranch, // Закрепление функции выпадения маркеров, всей выбранной ветки (оставшихся)
      children: [{label:"Логово ягуара",
      onSelect: dropMarkerOnMap, id: 13, latLng: [-42, -80]}]
    }, {
      label: "Юго-Восток",
      onSelect: dropMarkersFromBranch, // Закрепление функции выпадения маркеров, всей выбранной ветки (оставшихся)
      children: [
      {label:"Гранитный дворец",
      onSelect: dropMarkerOnMap, id: 1, latLng: [30, 23.42]},
      {label:"Трущебы",
      onSelect: dropMarkerOnMap, id: 2, latLng: [28.42, 28]},
      {label:"Мост через реку благодарения",
      onSelect: dropMarkerOnMap, id: 9, latLng: [23.24, 21.42]},
      {label:"Глицериновый ручей",
      onSelect: dropMarkerOnMap, id: 12, latLng: [26.66, 18.42]}]
    }]
  }];// Массив объектов для маркеров;

  $scope.setIndex = function() {
    $scope.mapData[0].children.forEach(function(child, index){
      child.children.forEach(function(itemChild, itemIndex){
        itemChild.itemId = itemIndex;
      });
    });
  };// Функция сохранения позиция маркеров в массиве;

  $scope.setIndex();// Вызов функции "сохранения позиция маркеров в массиве";
});