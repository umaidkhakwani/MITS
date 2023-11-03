import firebase_app from "../../Firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);
var API_LINK = "http://localhost:5000/";


function template() {

  const user = auth.currentUser;
  var email =""
  const company2 = useSelector((state) => state.users);
  console.log("showing company2 in add roles", company2[0]);

  const handle = () => {
    if (user) {
      email = user.email;

      const filteredCompanies = company2.filter(
        (company) => company.email === email
      );
      console.log("filtered companies", filteredCompanies[0]);
    }
  };

  return <div></div>;
}


// [
//     {"SKU":123432,	"barcode":454-dew	,"title":"Gloves"	,"price":20000.00	}
//     {"SKU":2eed3,	"barcode":234rt4	,"title":"Coke"	,"price":200.00	}
//     {"SKU":123432,	"barcode":454-dew	,"title":"Gloves"	,"price":20000.00	}
//     {"SKU":faniufhiu3,	"barcode":u3h83	,"title":"Nestle water"	,"price":5000.00	}
//     {"SKU":faniufhiu3,	"barcode":u3h83	,"title":"Nestle water"	,"price":5000.00	}
// ]