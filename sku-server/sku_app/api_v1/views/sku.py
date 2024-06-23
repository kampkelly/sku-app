from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from api_v1.models.sku import Sku
from api_v1.serializers.sku import SkuSerializer

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 1
    page_query_param = 'page'
    max_page_size = 1

    def get_paginated_response(self, data):
        '''
        Modifies how the response will be displayed.
        '''
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })

class SkuListCreateAPIView(APIView):
    '''
    Views for list and create
    '''
    pagination_class = StandardResultsSetPagination
    def get(self, request, pk=None, format=None):
        """
        Return a list of all SKUs
        """
        skus = Sku.objects.all()
        paginator = self.pagination_class()  # Instantiate the paginator
        page = paginator.paginate_queryset(skus, request, view=self)
        if page is not None:
            serializer = SkuSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)  # Return the paginated response

        serializer = SkuSerializer(skus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
      
    def post(self, request, format=None):
      """
      Create a new SKU.
      """
      serializer = SkuSerializer(data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
