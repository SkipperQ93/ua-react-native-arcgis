import ArcGIS

@objc(UaReactNativeArcgisViewManager)
class UaReactNativeArcgisViewManager: RCTViewManager {
    
    override func view() -> (UaReactNativeArcgisView) {
        return UaReactNativeArcgisView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc func addPoints(_ node: NSNumber, pointsDict: [Dictionary<String,Any>]) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(forReactTag: node) as! UaReactNativeArcgisView
            component.addPoints(pointsDict, animate: true)
        }
    }
    
    @objc func changeOnlineStatus(_ node: NSNumber, userId: Int, onlineStatus: Bool) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(forReactTag: node) as! UaReactNativeArcgisView
            component.changeOnlineStatus(userId: userId, onlineStatus: onlineStatus)
        }
    }
    
    @objc func changeLocation(_ node: NSNumber,  userInformation: Dictionary<String,Any>, latitude: String, longitude: String) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(forReactTag: node) as! UaReactNativeArcgisView
            component.changeLocation(userInformation: userInformation, latitude: latitude, longitude: longitude)
        }
    }
    
    @objc func addPath(_ node: NSNumber, path: [Dictionary<String, String>]) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(forReactTag: node) as! UaReactNativeArcgisView
            component.addPath(path: path)
        }
    }
    
    @objc func clearTracking(_ node: NSNumber) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(forReactTag: node) as! UaReactNativeArcgisView
            component.clearTracking()
        }
    }
    
}

class UaReactNativeArcgisView : UIView, AGSGeoViewTouchDelegate {
    
    class GraphicsLayerCollection {
        
        var graphicsLayer: AGSGraphicsOverlay
        var trackingLayer: AGSGraphicsOverlay
        
        init(graphicsLayer: AGSGraphicsOverlay, trackingLayer: AGSGraphicsOverlay) {
            self.graphicsLayer = graphicsLayer
            self.trackingLayer = trackingLayer
        }
        
    }
    
    var mapView: AGSMapView?
    
    var _graphicsLayers: GraphicsLayerCollection?
    
    func graphicsLayers() -> GraphicsLayerCollection {
        
        if let _graphicsLayers {
            return _graphicsLayers
        }
        
        let _graphicsLayer = AGSGraphicsOverlay()
        let _trackingLayer = AGSGraphicsOverlay()
        
        mapView?.graphicsOverlays.add(_trackingLayer)
        mapView?.graphicsOverlays.add(_graphicsLayer)
        
        _graphicsLayers = GraphicsLayerCollection(graphicsLayer: _graphicsLayer, trackingLayer: _trackingLayer)
        
        return _graphicsLayers!
    }
    
    
    @objc var pinpointConfig: Dictionary<String, AnyObject> = [:] {
        didSet {
            guard
                let urlString = pinpointConfig["url"] as? String,
                let url = URL(string: urlString),
                let latString = pinpointConfig["latitude"] as?  String,
                let lonString = pinpointConfig["longitude"] as? String
            else {
                return
            }
            
            let symbol = AGSPictureMarkerSymbol(url: url)
            symbol.height = 50
            symbol.width = 50
            symbol.offsetY = 25
            
            let latitude = (latString as NSString).doubleValue
            let longitude = (lonString as NSString).doubleValue
            
            let point = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: latitude, longitude: longitude))
            let pointGraphic = AGSGraphic(geometry: point, symbol: symbol)
            
            graphicsLayers().graphicsLayer.graphics.add(pointGraphic)
            
            mapView?.setViewpointCenter(point)
        }
    }
    @objc var licenseKey: String = "" {
        didSet {
            do {
                let result = try AGSArcGISRuntimeEnvironment.setLicenseKey(self.licenseKey)
                UaReactNativeArcgisUtilities.logInfo("ArcGIS License: \(result.licenseStatus.rawValue)")
            }
            catch let exception {
                UaReactNativeArcgisUtilities.logInfo(exception.localizedDescription)
            }
            
        }
    }
    @objc var pinpointMode: Bool = false
    @objc var onPointTap: RCTBubblingEventBlock?
    @objc var onMapViewLoad: RCTBubblingEventBlock? {
        didSet {
            if mapView != nil {
                onMapViewLoad?([:])
            }
        }
    }
    
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        mapView = AGSMapView();
        let mapView = mapView!
        mapView.isAttributionTextVisible = false
        
        addSubview(mapView);
        
        
        mapView.translatesAutoresizingMaskIntoConstraints = false
        let leftConstraint = NSLayoutConstraint(item: mapView, attribute: NSLayoutConstraint.Attribute.left, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.left, multiplier: 1, constant: 0)
        let topConstraint = NSLayoutConstraint(item: mapView, attribute: NSLayoutConstraint.Attribute.top, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.top, multiplier: 1, constant: 0)
        let rightConstraint = NSLayoutConstraint(item: mapView, attribute: NSLayoutConstraint.Attribute.right, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.right, multiplier: 1, constant: 0)
        let bottomConstraint = NSLayoutConstraint(item: mapView, attribute: NSLayoutConstraint.Attribute.bottom, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.bottom, multiplier: 1, constant: 0)
        NSLayoutConstraint.activate([leftConstraint, topConstraint, rightConstraint, bottomConstraint])
        
        mapView.touchDelegate = self
        
        onMapViewLoad?([:])
        
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    @objc var layers: [String] = [] {
        didSet {
            if (layers.count > 0) {
                
                let baseLayer = AGSArcGISTiledLayer(url: URL(string: layers[0])!)
                
                let basemap = AGSBasemap(baseLayer: baseLayer);
                let map = AGSMap(basemap: basemap)
                
                for (index, layer) in layers.enumerated() {
                    if index > 0 {
                        map.operationalLayers.add(AGSArcGISMapImageLayer(url: URL(string: layer)!))
                    }
                }
                
                mapView?.map = map
            }
        }
    }
    
    func addPoints(_ pointsDict: [Dictionary<String,Any>], animate: Bool) {
        
        UaReactNativeArcgisUtilities.logInfo("addPoints: \(pointsDict)")
        
        let avatarSize = CGFloat(50)
        
        for point in pointsDict {
            
            guard
                let latitudeString = point["latitude"] as? String,
                let longitudeString = point["longitude"] as? String,
                let latitude = Double(latitudeString),
                let longitude = Double(longitudeString),
                let attributes = point["attributes"] as? Dictionary<String,Any>,
                let pictureUrlString = attributes["pictureUrl"] as? String,
                let pictureUrl = URL(string: pictureUrlString),
                let isActive = attributes["isActive"] as? Bool else {
                continue
            }
            
            let point = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: latitude, longitude: longitude))
            
            let avatarSymbol = AGSPictureMarkerSymbol(url: pictureUrl)
            avatarSymbol.height = avatarSize
            avatarSymbol.width = avatarSize
            
            let outlineSymbol = AGSSimpleMarkerSymbol(style: .circle, color: isActive ? .green : .red, size: avatarSize + 5)
            
            let pointOutlineGraphic = AGSGraphic(geometry: point, symbol: outlineSymbol, attributes: ["type": "outline", "data": attributes])
            let pointGraphic = AGSGraphic(geometry: point, symbol: avatarSymbol, attributes: ["type": "main", "data": attributes])
            
            graphicsLayers().graphicsLayer.graphics.add(pointOutlineGraphic)
            graphicsLayers().graphicsLayer.graphics.add(pointGraphic)
        }
        
        if animate {
            mapView?.setViewpointGeometry(graphicsLayers().graphicsLayer.extent, padding: 50)
        }
        
    }
    
    func changeOnlineStatus(userId: Int, onlineStatus: Bool) {
        
        UaReactNativeArcgisUtilities.logInfo("changeOnlineStatus: \(userId): \(onlineStatus)")
        
        for graphic in graphicsLayers().graphicsLayer.graphics {
            guard let graphic = graphic as? AGSGraphic else {
                continue
            }
            
            let attributes = graphic.attributes
            
            guard
                attributes["type"] as? String == "outline",
                let data = attributes["data"] as? Dictionary<String, Any>,
                let dataUser = data["user"] as? Dictionary<String, Any>,
                let dataUserId = dataUser["id"] as? NSNumber,
                dataUserId.intValue == userId,
                let markerSymbol = graphic.symbol as? AGSSimpleMarkerSymbol else {
                continue
            }
            
            graphic.symbol = AGSSimpleMarkerSymbol(style: .circle, color: onlineStatus ? .green : .red, size: markerSymbol.size)
        }
        
    }
    
    func changeLocation(userInformation: Dictionary<String,Any>, latitude: String, longitude: String) {
        
        UaReactNativeArcgisUtilities.logInfo("changeLocation: latitude: \"\(latitude)\", longitude: \"\(longitude)\" userInformation: \(userInformation)")
        
        var found = false
        
        let latitudeFloat = CGFloat((latitude as NSString).doubleValue)
        let longitudeFloat = CGFloat((longitude as NSString).doubleValue)
        
        for graphic in graphicsLayers().graphicsLayer.graphics {
            guard let graphic = graphic as? AGSGraphic else {
                continue
            }
            
            let attributes = graphic.attributes
            
            guard
                let data = attributes["data"] as? Dictionary<String, Any>,
                let dataUser = data["user"] as? Dictionary<String, Any>,
                let dataUserId = dataUser["id"] as? NSNumber,
                let targetDataUser = userInformation["user"] as? Dictionary<String, Any>,
                let targetDataUserId = targetDataUser["id"] as? NSNumber,
                dataUserId.intValue == targetDataUserId.intValue else {
                continue
            }
            
            found = true
            
            let point = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: latitudeFloat, longitude: longitudeFloat))
            
            graphic.geometry = point
        }
        
        if !found {
            
            var pointData = Dictionary<String,Any>()
            pointData["latitude"] = latitude
            pointData["longitude"] = longitude
            pointData["attributes"] = userInformation
            
            addPoints([pointData], animate: false)
        }
        
    }
    
    func addPath(path: [Dictionary<String, String>]) {
        
        graphicsLayers().trackingLayer.graphics.removeAllObjects()
        
        
        for i in 0..<path.count-1 {
            let geometry = AGSPolylineBuilder(points: [
                AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (path[i]["latitude"]! as NSString).doubleValue, longitude: (path[i]["longitude"]! as NSString).doubleValue)),
                AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (path[i+1]["latitude"]! as NSString).doubleValue, longitude: (path[i+1]["longitude"]! as NSString).doubleValue))
            ]).toGeometry()
            let symbol = AGSSimpleLineSymbol(style: .solid, color: .red, width: 4, markerStyle: .arrow, markerPlacement: .end)
            let graphic = AGSGraphic(geometry: geometry, symbol: symbol)
            graphicsLayers().trackingLayer.graphics.add(graphic)
        }
    }
    
    func clearTracking() {
        graphicsLayers().trackingLayer.graphics.removeAllObjects();
    }
    
    func geoView(_ geoView: AGSGeoView, didTapAtScreenPoint screenPoint: CGPoint, mapPoint: AGSPoint) {
        
        UaReactNativeArcgisUtilities.logInfo("didTapAtScreenPoint: latitude: \"\(mapPoint.toCLLocationCoordinate2D().latitude)\", longitude: \"\(mapPoint.toCLLocationCoordinate2D().longitude)\"")
        
        if pinpointMode,
           let readMode = pinpointConfig["readMode"] as? Bool,
           !readMode {
            graphicsLayers().graphicsLayer.graphics.removeAllObjects()
            guard
                let urlString = pinpointConfig["url"] as? String,
                let url = URL(string: urlString) else {
                return
            }
            
            let symbol = AGSPictureMarkerSymbol(url: url)
            symbol.height = 50
            symbol.width = 50
            symbol.offsetY = 25
            
            let pointGraphic = AGSGraphic(geometry: mapPoint, symbol: symbol)
            
            graphicsLayers().graphicsLayer.graphics.add(pointGraphic)
            
            mapView?.setViewpointCenter(mapPoint)
            
            onPointTap?([
                "latitude": "\(mapPoint.toCLLocationCoordinate2D().latitude)",
                "longitude": "\(mapPoint.toCLLocationCoordinate2D().longitude)"
            ])
        }
        else {
            mapView?.identify(graphicsLayers().graphicsLayer,
                              screenPoint: screenPoint,
                              tolerance: 22,
                              returnPopupsOnly: false,
                              maximumResults: 50) { results in
                var dataArray = [Dictionary<String,Any>]()
                for result in results.graphics {
                    guard
                        let type = result.attributes["type"] as? String,
                        type == "main",
                        let data = result.attributes["data"] as? Dictionary<String,Any> else {
                        continue
                    }
                    dataArray.append(data);
                    
                }
                
                self.onPointTap?([
                    "dataArray": dataArray
                ])
                
            }
        }
    }
    
    
}
