import { Controller, Post, Req, Res, Body, HttpStatus, Get } from '@nestjs/common';
import { ReviewPlaceService } from './review-place.service';

@Controller('review-place')
export class ReviewPlaceController {

    constructor(private reviewPlaceService: ReviewPlaceService) {}

    @Post()
    async ceateReview(@Req() req, @Res() res, @Body() body){
        const review = await this.reviewPlaceService.createReview(body)
       return res.status(HttpStatus.OK).json({
        message: 'Booking has been created successfully',
        data:review
      }); 
    }
    @Post('/get')
    async getReview(@Req() req, @Res() res, @Body() body){
        const review = await this.reviewPlaceService.getReview(body)
       return res.status(HttpStatus.OK).json({
        data:review
      }); 
    }
    @Post('/getByUser')
    async getReviewBuser(@Req() req, @Res() res, @Body() body){
        const review = await this.reviewPlaceService.getReviewBuser(body)
       return res.status(HttpStatus.OK).json({
        data:review
      }); 
    }
    @Get('/getAll')
    async getAllReview(@Req() req, @Res() res){
        const review = await this.reviewPlaceService.getAllReview()
       return res.status(HttpStatus.OK).json({
        data:review
      }); 
    }
}
