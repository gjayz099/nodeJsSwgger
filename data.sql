CREATE TABLE account (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- Unique identifier for the user
    Username NVARCHAR(100) NULL,
    Password NVARCHAR(max) NULL -- Consider encryption for passwords in real scenarios
);

CREATE TABLE friends (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- Unique identifier for the user
    Name NVARCHAR(255) NULL,
    Age int NULL -- Consider encryption for passwords in real scenarios
);
