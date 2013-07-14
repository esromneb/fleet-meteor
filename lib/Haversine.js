//public class HaversineAlgorithm {
//
//    static final double _eQuatorialEarthRadius = 6378.1370D;
//    static final double _d2r = (Math.PI / 180D);
//
//    public static int HaversineInM(double lat1, double long1, double lat2, double long2) {
//        return (int) (1000D * HaversineInKM(lat1, long1, lat2, long2));
//    }
//
//    public static double HaversineInKM(double lat1, double long1, double lat2, double long2) {
//        double dlong = (long2 - long1) * _d2r;
//        double dlat = (lat2 - lat1) * _d2r;
//        double a = Math.pow(Math.sin(dlat / 2D), 2D) + Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r)
//        * Math.pow(Math.sin(dlong / 2D), 2D);
//        double c = 2D * Math.atan2(Math.sqrt(a), Math.sqrt(1D - a));
//        double d = _eQuatorialEarthRadius * c;
//
//        return d;
//    }
//
//}


Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

HaversineInKM = function(lat1, lon1, lat2, lon2)
{

    var R = 6371; // km

    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();
    var x2 = lon2-lon1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
}