FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
EXPOSE 80

# COPY ALL.CSPROJ FILES AND RESTORE AS DISTINCT LAYERS. 
# USE OF THE SAME COPY COMMAND FOR EVERY DOCKERFILE IN THE PROJECT TO TAKE THE ADVANTAGE OF DOCKER CACHING
COPY ArcadiaAuctionHouse.sln ArcadiaAuctionHouse.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/NotificationService/NotificationService.csproj src/NotificationService/NotificationService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/ImageService/ImageService.csproj src/ImageService/ImageService.csproj
COPY src/StoryService/StoryService.csproj src/StoryService/StoryService.csproj

#Restore package deps
RUN dotnet restore ArcadiaAuctionHouse.sln

#Copy the app folders over

COPY src/GatewayService src/GatewayService
WORKDIR /app/src/GatewayService
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "GatewayService.dll"]

