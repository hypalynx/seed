-- Template for setting up a table (the 'TARGET') e.g orders
CREATE TABLE IF NOT EXISTS TARGET (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data JSON NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_TARGET_ref ON TARGET (json_extract (data, '$.ref'))
WHERE
  json_extract (data, '$.ref') IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_TARGET_created_at ON TARGET (json_extract (data, '$.created_at'))
WHERE
  json_extract (data, '$.created_at') IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_TARGET_updated_at ON TARGET (json_extract (data, '$.updated_at'))
WHERE
  json_extract (data, '$.updated_at') IS NOT NULL;

-- INSERT trigger - only set timestamps if they don't exist
CREATE TRIGGER IF NOT EXISTS insert_TARGET_json_timestamps
AFTER INSERT ON TARGET WHEN json_extract (NEW.data, '$.created_at') IS NULL
OR json_extract (NEW.data, '$.updated_at') IS NULL
BEGIN
UPDATE TARGET
SET
  data = CASE
    WHEN json_extract (NEW.data, '$.created_at') IS NULL
    AND json_extract (NEW.data, '$.updated_at') IS NULL THEN json_set (
      json_set (
        NEW.data,
        '$.created_at',
        strftime ('%Y-%m-%dT%H:%M:%SZ', 'now', 'utc')
      ),
      '$.updated_at',
      strftime ('%Y-%m-%dT%H:%M:%SZ', 'now', 'utc')
    )
    WHEN json_extract (NEW.data, '$.created_at') IS NULL THEN json_set (
      NEW.data,
      '$.created_at',
      strftime ('%Y-%m-%dT%H:%M:%SZ', 'now', 'utc')
    )
    WHEN json_extract (NEW.data, '$.updated_at') IS NULL THEN json_set (
      NEW.data,
      '$.updated_at',
      strftime ('%Y-%m-%dT%H:%M:%SZ', 'now', 'utc')
    )
    ELSE NEW.data
  END
WHERE
  id = NEW.id;

END;

CREATE TRIGGER IF NOT EXISTS update_TARGET_json_timestamp
AFTER
UPDATE ON TARGET WHEN NEW.data != OLD.data
BEGIN
UPDATE TARGET
SET
  data = json_set (
    NEW.data,
    '$.updated_at',
    strftime ('%Y-%m-%dT%H:%M:%SZ', 'now', 'utc')
  )
WHERE
  id = NEW.id;

END;
