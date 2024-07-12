module users {
  scalar type military_type extending enum<PM, BM>;

  module Users {
    type User extending default::Timestamped {
      name: str;
      email: str;
      whatsapp: str;
      military_type: str;
      current_station: str;
      current_origin: str;
      next_target: str;
      personal_notes: str;
      username: str;
      password: str;
    }
  }
}