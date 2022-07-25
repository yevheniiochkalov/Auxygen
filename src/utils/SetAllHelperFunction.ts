const setAll = (obj, val) => {
  /* Duplicated with @Maksim Kalmykov
        for(index in obj) if(obj.hasOwnProperty(index))
            obj[index] = val;
    */
  Object.keys(obj).forEach(function (index) {
    obj[index] = val;
  });
};
