declare namespace NameSpace {
  interface WithEnum {
    propertyWithoutDefaultValue: InsideNameSpace;
    propertyWithDefaultValue: InsideNameSpaceValue;
  }

  enum InsideNameSpaceValue {
    A = '1',
    B = '2',
  }

  enum InsideNameSpace {
    A,
    B,
  }
}
