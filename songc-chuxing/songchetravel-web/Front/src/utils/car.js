export default {
    filter: {
        oil_type(val) {
            switch (val) {
                case 1:
                    return "90号";
                case 2:
                    return "92号";
                case 3:
                    return "95号";
                case 4:
                    return "98号";
                case 5:
                    return "柴油";
                default:
                    return "自动(AT)";
            };
        },
        gearbox_type(val) {
            // 1、手动(MT)
            // 2、自动(AT)
            // 3、手自一体(AMT)
            // 4、双离合变速器(DCT)
            // 5、无级(CVT)
            switch (val) {
                case "1":
                    return "手动(MT)";
                case "2":
                    return "自动(AT)";
                case "3":
                    return "手自一体(AMT)";
                case "4":
                    return "双离合变速器(DCT)";
                case "5":
                    return "无级(CVT)";
                default:
                    return "自动(AT)";
            };
        },
        electric(val) {
            switch (val) {
                case "1":
                    return "电动车";
                default:
                    return "机动车";
            };
        },
        classfy(val) {
            switch (val) {
                case "1":
                    return "经济型";
                case "2":
                    return "豪华型";
                default:
                    return "-";
            }
        },
        left_oil_type(val) {
            switch (val) {
                case "0":
                    return "未知";
                case "1":
                    return "油量";
                case "2":
                    return "百分比";
                default:
                    return "未知";
            }
        },
        displacement_type(val) {
            switch (val) {
                case "1":
                    return "吸气";
                case "2":
                    return "涡轮";
                default:
                    return "吸气";
            }
        }
    }
}