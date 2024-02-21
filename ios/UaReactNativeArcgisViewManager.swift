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
                let xString = point["x"] as? String,
                let yString = point["y"] as? String,
                let x = Double(xString),
                let y = Double(yString),
                let attributes = point["attributes"] as? Dictionary<String,AnyObject>,
                let pictureUrlString = attributes["pictureUrl"] as? String,
                let pictureUrl = URL(string: pictureUrlString),
                let size = point["size"] as? NSNumber else {
                continue
            }
            
            let point = AGSPoint(x: Double(x), y: Double(y), spatialReference: mapView.spatialReference)
            
            let avatarSymbol = AGSPictureMarkerSymbol(url: pictureUrl)
            avatarSymbol.height = CGFloat(size.floatValue)
            avatarSymbol.width = CGFloat(size.floatValue)
            
            let outlineSymbol = AGSSimpleMarkerSymbol(style: .circle, color: .green, size: CGFloat(size.floatValue + 5))
            
            let pointOutlineGraphic = AGSGraphic(geometry: point, symbol: outlineSymbol)
            let pointGraphic = AGSGraphic(geometry: point, symbol: avatarSymbol)
            
            graphicsLayer.graphics.add(pointOutlineGraphic)
            graphicsLayer.graphics.add(pointGraphic)
        }
    }
    
    func geoView(_ geoView: AGSGeoView, didTapAtScreenPoint screenPoint: CGPoint, mapPoint: AGSPoint) {
        UaReactNativeArcgisUtilities.logInfo("didTapAtScreenPoint: \(mapPoint)")
    }
    
    
}
