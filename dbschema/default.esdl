module default {
  abstract type Timestamped {
    required created_at: datetime {
      readonly := true;
      default := datetime_of_statement();
    };
    updated_at: datetime {
      rewrite insert, update using (datetime_of_statement())
    }
  }

  abstract type GlobalCurrency {
    required value: int32;
    property value_float := .value / 100;
  }
}
