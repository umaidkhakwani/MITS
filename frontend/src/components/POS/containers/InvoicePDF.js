
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
  forwardRef
} from '@react-pdf/renderer';

// Import your logo image
import logoImage from '../../../images/MITS_logo.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  item: {
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  bullet: {
    fontFamily: 'FontAwesome',
    fontSize: 10,
    marginRight: 5,
    alignSelf: 'flex-start',
  },
});

Font.register({
  family: 'FontAwesome',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf',
});

const renderItemList = (items, gstValues, discount_Values, quantityValues) => {
  return items.map((item, index) => (
    <View key={index} style={styles.item}>
      <Text style={styles.bullet}>&#xf0ca;</Text>
      <Text>Item: {item.title}</Text>
      <Text style={styles.bullet}>&#xf155;</Text>
      <Text>Price: {item.retail_price}</Text>
      <Text style={styles.bullet}>&#xf155;</Text>
      <Text>Quantity: {quantityValues[index]}</Text>
      <Text style={styles.bullet}>&#xf155;</Text>
      <Text>Per Item GST: {gstValues[index]}</Text>
      <Text style={styles.bullet}>&#xf155;</Text>
      <Text>Per Item discount: {discount_Values[index]}</Text>
      <Text style={styles.bullet}>&#xf155;</Text>
      <Text>Total Price: {parseInt(quantityValues[index] * (item.retail_price * (1 + gstValues[index] / 100)))}</Text>
    </View>
  ));
};

const InvoicePDF = ({ items, total_retail, gstValues, quantityValues, totalSum, inputValue, total_discount, total_paid, discount_Values}) => {
  return (
    <PDFViewer width={600} height={700}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Image src={logoImage} style={styles.logo} />

            <Text>Invoice</Text>
            {renderItemList(items, gstValues, discount_Values, quantityValues)}
            <Text style={styles.bullet}>&#xf0c3;</Text>
            <Text>Grand Total: {totalSum}</Text>
            <Text>Total Discount: {total_discount}</Text>
            <Text>Total Paid: {total_paid}</Text>
            <Text style={styles.bullet}>&#xf155;</Text>
            <Text>Total Amount Entered: {inputValue}</Text>
            <Text style={styles.bullet}>&#xf155;</Text>
            <br/>
            <Text>Return: {inputValue - total_paid}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoicePDF;