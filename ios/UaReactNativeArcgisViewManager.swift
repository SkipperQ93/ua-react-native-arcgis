import ArcGIS

@objc(UaReactNativeArcgisViewManager)
class UaReactNativeArcgisViewManager: RCTViewManager {
    
    var component: UaReactNativeArcgisView!
    
    override func view() -> (UaReactNativeArcgisView) {
        component = UaReactNativeArcgisView()
        return component
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc func addPoints(_ node: NSNumber, pointsDict: [Dictionary<String,AnyObject>]) {
        component?.addPoints(pointsDict)
    }
    
    @objc func changeOnlineStatus(_ node: NSNumber, userId: Int, onlineStatus: Bool) {
        component?.changeOnlineStatus(userId: userId, onlineStatus: onlineStatus)
    }
    
    @objc func changeLocation(_ node: NSNumber, userId: Int, latitude: String, longitude: String) {
        component?.changeLocation(userId: userId, latitude: latitude, longitude: longitude)
    }
    
    @objc func addPath(_ node: NSNumber, path: [Dictionary<String, String>]) {
        component?.addPath(path: path)
    }
    
}

class UaReactNativeArcgisView : UIView, AGSGeoViewTouchDelegate {
    
    var mapView: AGSMapView!
    
    var graphicsLayer: AGSGraphicsOverlay!
    var trackingLayer: AGSGraphicsOverlay!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        mapView = AGSMapView();
        addSubview(mapView);
        
        
        mapView.translatesAutoresizingMaskIntoConstraints = false
        let leftConstraint = NSLayoutConstraint(item: mapView!, attribute: NSLayoutConstraint.Attribute.left, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.left, multiplier: 1, constant: 0)
        let topConstraint = NSLayoutConstraint(item: mapView!, attribute: NSLayoutConstraint.Attribute.top, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.top, multiplier: 1, constant: 0)
        let rightConstraint = NSLayoutConstraint(item: mapView!, attribute: NSLayoutConstraint.Attribute.right, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.right, multiplier: 1, constant: 0)
        let bottomConstraint = NSLayoutConstraint(item: mapView!, attribute: NSLayoutConstraint.Attribute.bottom, relatedBy: NSLayoutConstraint.Relation.equal, toItem: self, attribute: NSLayoutConstraint.Attribute.bottom, multiplier: 1, constant: 0)
        NSLayoutConstraint.activate([leftConstraint, topConstraint, rightConstraint, bottomConstraint])
        
        mapView.touchDelegate = self
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
                
                graphicsLayer = AGSGraphicsOverlay()
                trackingLayer = AGSGraphicsOverlay()
                
                mapView.graphicsOverlays.add(graphicsLayer!)
                mapView.graphicsOverlays.add(trackingLayer!)
                
                mapView.map = map
            }
        }
    }
    
    func addPoints(_ pointsDict: [Dictionary<String,AnyObject>]) {
        
        UaReactNativeArcgisUtilities.logInfo("addPoints: \(pointsDict)")
        
        for point in pointsDict {
            
            guard
                let mapView = mapView,
                let latitudeString = point["latitude"] as? String,
                let longitudeString = point["longitude"] as? String,
                let latitude = Double(latitudeString),
                let longitude = Double(longitudeString),
                let attributes = point["attributes"] as? Dictionary<String,AnyObject>,
                let pictureUrlString = attributes["pictureUrl"] as? String,
                let pictureUrl = URL(string: pictureUrlString),
                let size = point["size"] as? NSNumber,
                let isActive = attributes["isActive"] as? Bool else {
                continue
            }
            
            let point = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: latitude, longitude: longitude))
            
            let avatarSymbol = AGSPictureMarkerSymbol(url: pictureUrl)
            avatarSymbol.height = CGFloat(size.floatValue)
            avatarSymbol.width = CGFloat(size.floatValue)
            
            let outlineSymbol = AGSSimpleMarkerSymbol(style: .circle, color: isActive ? .green : .red, size: CGFloat(size.floatValue + 5))
            
            let pointOutlineGraphic = AGSGraphic(geometry: point, symbol: outlineSymbol, attributes: ["type": "outline", "data": attributes])
            let pointGraphic = AGSGraphic(geometry: point, symbol: avatarSymbol, attributes: ["type": "outline", "data": attributes])
            
            graphicsLayer.graphics.add(pointOutlineGraphic)
            graphicsLayer.graphics.add(pointGraphic)
        }
        
        mapView.setViewpointGeometry(graphicsLayer.extent, padding: 50)
        
    }
    
    func changeOnlineStatus(userId: Int, onlineStatus: Bool) {
        
        UaReactNativeArcgisUtilities.logInfo("changeOnlineStatus: \(userId): \(onlineStatus)")
        
        for graphic in graphicsLayer.graphics {
            guard let graphic = graphic as? AGSGraphic else {
                continue
            }
            
            let attributes = graphic.attributes
            
            guard
                attributes["type"] as? String == "outline",
                let data = attributes["data"] as? Dictionary<String, AnyObject>,
                let dataUser = data["user"] as? Dictionary<String, AnyObject>,
                let dataUserId = dataUser["id"] as? NSNumber,
                dataUserId.intValue == userId,
                let markerSymbol = graphic.symbol as? AGSSimpleMarkerSymbol else {
                continue
            }
            
            graphic.symbol = AGSSimpleMarkerSymbol(style: .circle, color: onlineStatus ? .green : .red, size: markerSymbol.size)
        }
        
    }
    
    func changeLocation(userId: Int, latitude: String, longitude: String) {
        
        UaReactNativeArcgisUtilities.logInfo("changeLocation: \(userId)")
        
        let latitudeFloat = CGFloat((latitude as NSString).doubleValue)
        let longitudeFloat = CGFloat((longitude as NSString).doubleValue)
        
        for graphic in graphicsLayer.graphics {
            guard let graphic = graphic as? AGSGraphic else {
                continue
            }
            
            let attributes = graphic.attributes
            
            guard
                let data = attributes["data"] as? Dictionary<String, AnyObject>,
                let dataUser = data["user"] as? Dictionary<String, AnyObject>,
                let dataUserId = dataUser["id"] as? NSNumber,
                dataUserId.intValue == userId else {
                continue
            }
            
            let point = AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: latitudeFloat, longitude: longitudeFloat))
            
            graphic.geometry = point
        }
        
    }
    
    func addPath(path: [Dictionary<String, String>]) {
        
        //        let path = [
        //            AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: 9.444143322578604, longitude: 5.875220353185171)),
        //            AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: 5.769003831562305, longitude: -1.0527436959526062)),
        //            AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: -1.8890085333646878, longitude: -1.8200916510034384)),
        //            AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude:  -4.339896475224199, longitude: 2.9156033170587947))];
        //
        //        let processedPath = [AGSPoint]()
        
        trackingLayer.graphics.removeAllObjects()
        
        
        for i in 0..<path.count-1 {
            let geometry = AGSPolylineBuilder(points: [
                AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (path[i]["latitude"]! as NSString).doubleValue, longitude: (path[i]["longitude"]! as NSString).doubleValue)),
                AGSPoint(clLocationCoordinate2D: CLLocationCoordinate2D(latitude: (path[i+1]["latitude"]! as NSString).doubleValue, longitude: (path[i+1]["longitude"]! as NSString).doubleValue))
            ]).toGeometry()
            let symbol = AGSSimpleLineSymbol(style: .solid, color: .blue, width: 4, markerStyle: .arrow, markerPlacement: .end)
            let graphic = AGSGraphic(geometry: geometry, symbol: symbol)
            trackingLayer.graphics.add(graphic)
        }
    }
    
    func geoView(_ geoView: AGSGeoView, didTapAtScreenPoint screenPoint: CGPoint, mapPoint: AGSPoint) {
        UaReactNativeArcgisUtilities.logInfo("didTapAtScreenPoint: latitude: \"\(mapPoint.toCLLocationCoordinate2D().latitude)\", longitude: \"\(mapPoint.toCLLocationCoordinate2D().longitude)\"")
    }
    
    
}
